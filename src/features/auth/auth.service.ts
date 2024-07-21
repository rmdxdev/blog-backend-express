import { resetPasswordTokenSelect } from './auth.select'
import {
  ForgotPasswordPayload,
  LoginData,
  RegisterData,
  ResetPasswordParams,
  ResetPasswordPayload
} from './ts/interfaces'
import {
  AuthResponse,
  IdentifyResponse,
  ResetPasswordResponse,
  SendPasswordLinkResponse,
  VerifyResetPasswordResponse,
  VerifyResetPasswordToken
} from './ts/types'
import { CLIENT_URL, JWT_REFRESH_TOKEN_SECRET } from '@/constants'
import { generateHashedPassword } from '@/helpers/generate-hashed-password.helper'
import { generateTokens } from '@/helpers/generate-tokens.helper'
import { logger } from '@/helpers/logger.helper'
import { sendEmail } from '@/helpers/send-email.helper'
import { prismaClient } from '@/libs/prisma-client.lib'
import { JwtAuthPayload, Nullable, Tokens } from '@/types'
import bcrypt from 'bcrypt'
import { Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

export default class AuthService {
  private static isTokenPasswordResetExpired(token: Nullable<VerifyResetPasswordToken>) {
    return !token || (token.expires && new Date() > token.expires)
  }

  static async register(payload: RegisterData, res: AuthResponse) {
    try {
      const userExist = await prismaClient.user.findFirst({
        where: {
          OR: [{ username: payload.username.toLowerCase() }, { email: payload.email.toLowerCase() }]
        }
      })

      if (userExist) {
        return res.status(409).json({
          message: 'User already registered'
        })
      }

      const hashedPassword = await generateHashedPassword(payload.password)

      const user = await prismaClient.user.create({
        data: {
          ...payload,
          password: hashedPassword
        }
      })

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userData } = user
      const tokens: Tokens = generateTokens(user.id)

      await prismaClient.authToken.create({
        data: {
          user_id: user.id,
          ...tokens
        }
      })

      res.status(201).json({
        ...userData,
        tokens
      })
    } catch (err: any) {
      logger('auth').error(`Registration: ${err.message}`)

      res.status(500).json({
        message: 'Failed to create a user'
      })
    }
  }

  static async login(payload: LoginData, res: AuthResponse) {
    try {
      const user = await prismaClient.user.findFirst({ where: { email: payload.email } })

      if (!user) {
        return res.status(404).json({
          message: 'Email or password does not match'
        })
      }

      const isValidPassword = await bcrypt.compare(payload.password, user.password)

      if (!isValidPassword) {
        return res.status(403).json({
          message: 'Email or password does not match'
        })
      }

      const tokens = generateTokens(user.id)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userData } = user

      const authToken = await prismaClient.authToken.findFirst({
        where: { user_id: user.id }
      })

      if (authToken) {
        await prismaClient.authToken.update({
          where: { id: authToken.id },
          data: {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token
          }
        })
      } else {
        await prismaClient.authToken.create({
          data: {
            user_id: user.id,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token
          }
        })
      }

      res.status(200).json({
        ...userData,
        tokens
      })
    } catch (err: any) {
      logger('auth').error(`Login: ${err.message}`)

      res.status(500).json({
        message: 'Login error'
      })
    }
  }

  static async logout(userId: string, res: Response) {
    try {
      const authToken = await prismaClient.authToken.findFirst({
        where: { user_id: userId }
      })

      if (!authToken) {
        return res.status(404).json({
          message: 'Auth Token not found'
        })
      }

      await prismaClient.authToken.delete({
        where: {
          id: authToken.id,
          user_id: userId
        }
      })

      res.status(200).end()
    } catch (err: any) {
      logger('auth').error(`Logout: ${err.message}`)

      res.status(500).json({
        message: 'Failed to logout'
      })
    }
  }

  static async sendResetPasswordLink(
    payload: ForgotPasswordPayload,
    res: SendPasswordLinkResponse
  ) {
    try {
      const user = await prismaClient.user.findFirst({ where: { email: payload.email } })

      if (!user) {
        return res.status(404).json({
          message: 'The user with this mail does not exist'
        })
      }

      const expires = new Date()
      expires.setHours(expires.getHours() + 1)

      const token = await prismaClient.resetToken.create({
        data: {
          user_id: user.id,
          token: uuidv4(),
          expires
        }
      })

      const url = `${CLIENT_URL}/reset-password/${user.id}/${token.token}`

      await sendEmail({
        email: user.email,
        subject: 'Password Reset',
        body: url,
        lang: payload.lang
      })

      res.status(200).json({
        message: 'A password recovery email was sent to your specified email address'
      })
    } catch (err: any) {
      logger('auth').error(`Reset password link: ${err.message}`)

      res.status(500).json({
        message: 'Failed to recover password'
      })
    }
  }

  static async verifyResetPassword(payload: ResetPasswordParams, res: VerifyResetPasswordResponse) {
    try {
      const token = await prismaClient.resetToken.findFirst({
        where: { user_id: payload.id, token: payload.token },
        select: resetPasswordTokenSelect
      })

      if (this.isTokenPasswordResetExpired(token)) {
        return res.status(400).json({
          message: 'Token invalid'
        })
      }

      res.status(200).end()
    } catch (err: any) {
      logger('auth').error(`Verify reset password: ${err.message}`)

      return res.status(500).json({
        message: 'Verify password token error'
      })
    }
  }

  static async resetPassword(payload: ResetPasswordPayload, res: ResetPasswordResponse) {
    try {
      const user = await prismaClient.user.findUnique({ where: { id: payload.id } })

      if (!user) {
        return res.status(400).json({
          message: 'Invalid user'
        })
      }

      const token = await prismaClient.resetToken.findUnique({
        where: { id: user?.id, token: payload.token },
        select: resetPasswordTokenSelect
      })

      if (this.isTokenPasswordResetExpired(token)) {
        return res.status(400).json({
          message: 'Token invalid'
        })
      }

      if (user) {
        const hashedPassword = await generateHashedPassword(payload.password)

        await prismaClient.user.update({
          where: { id: user.id },
          data: { password: hashedPassword }
        })

        await prismaClient.resetToken.deleteMany({ where: { user_id: user.id } })
      }

      res.status(200).end()
    } catch (err: any) {
      logger('auth').error(`Reset password: ${payload.id}/${payload.token}`)

      res.status(500).json({
        message: 'Password reset error'
      })
    }
  }

  static async identify(id: string, res: IdentifyResponse) {
    try {
      const user = await prismaClient.user.findUniqueOrThrow({ where: { id } })

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userData } = user

      res.status(200).json(userData)
    } catch (err: any) {
      logger('auth').error(`Identify: ${err.message}`)

      res.status(401).json({
        message: "You don't have access"
      })
    }
  }

  static async refreshTokens(refreshToken: string, res: Response) {
    try {
      const verifiedRefreshToken = jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET as Secret)

      if (!verifiedRefreshToken) {
        return res.status(401).json({
          message: 'Invalid refresh token'
        })
      }

      const { id } = verifiedRefreshToken as unknown as JwtAuthPayload

      const authToken = await prismaClient.authToken.findFirst({
        where: { user_id: id }
      })

      if (authToken?.refresh_token !== refreshToken) {
        return res.status(401).json({
          message: 'Invalid refresh token'
        })
      }

      const user = await prismaClient.user.findUnique({
        where: { id }
      })

      const tokens = generateTokens(user?.id || '')

      res.status(200).json(tokens)
    } catch (err) {
      res.status(500).json({
        message: 'Refresh token invalid error'
      })
    }
  }
}
