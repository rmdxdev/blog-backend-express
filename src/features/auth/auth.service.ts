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
import { generateHashedPassword, generateTokens, logger, sendEmail } from '@/helpers'
import { prismaClient } from '@/libs/prisma-client.lib'
import { JwtAuthPayload, Nullable, Tokens } from '@/types'
import bcrypt from 'bcrypt'
import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
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
        return res.status(StatusCodes.CONFLICT).json({
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

      res.status(StatusCodes.CREATED).json({
        ...userData,
        tokens
      })
    } catch (err: any) {
      logger('auth').error(`Registration: ${err.message}`)

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to create a user'
      })
    }
  }

  static async login(payload: LoginData, res: AuthResponse) {
    try {
      const user = await prismaClient.user.findFirst({ where: { email: payload.email } })

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Email or password does not match'
        })
      }

      const isValidPassword = await bcrypt.compare(payload.password, user.password)

      if (!isValidPassword) {
        return res.status(StatusCodes.FORBIDDEN).json({
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

      res.status(StatusCodes.OK).json({
        ...userData,
        tokens
      })
    } catch (err: any) {
      logger('auth').error(`Login: ${err.message}`)

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
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
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Auth Token not found'
        })
      }

      await prismaClient.authToken.delete({
        where: {
          id: authToken.id,
          user_id: userId
        }
      })

      res.status(StatusCodes.OK).end()
    } catch (err: any) {
      logger('auth').error(`Logout: ${err.message}`)

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
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
        return res.status(StatusCodes.NOT_FOUND).json({
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

      res.status(StatusCodes.OK).json({
        message: 'A password recovery email was sent to your specified email address'
      })
    } catch (err: any) {
      logger('auth').error(`Reset password link: ${err.message}`)

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
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
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Token invalid'
        })
      }

      res.status(StatusCodes.OK).end()
    } catch (err: any) {
      logger('auth').error(`Verify reset password: ${err.message}`)

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Verify password token error'
      })
    }
  }

  static async resetPassword(payload: ResetPasswordPayload, res: ResetPasswordResponse) {
    try {
      const user = await prismaClient.user.findUnique({ where: { id: payload.id } })

      if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid user'
        })
      }

      const token = await prismaClient.resetToken.findUnique({
        where: { id: user?.id, token: payload.token },
        select: resetPasswordTokenSelect
      })

      if (this.isTokenPasswordResetExpired(token)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
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

      res.status(StatusCodes.OK).end()
    } catch (err: any) {
      logger('auth').error(`Reset password: ${payload.id}/${payload.token}`)

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Password reset error'
      })
    }
  }

  static async identify(id: string, res: IdentifyResponse) {
    try {
      const user = await prismaClient.user.findUniqueOrThrow({ where: { id } })

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userData } = user

      res.status(StatusCodes.OK).json(userData)
    } catch (err: any) {
      logger('auth').error(`Identify: ${err.message}`)

      res.status(StatusCodes.UNAUTHORIZED).json({
        message: "You don't have access"
      })
    }
  }

  static async refreshTokens(refreshToken: string, res: Response) {
    try {
      const verifiedRefreshToken = jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET as Secret)

      if (!verifiedRefreshToken) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Invalid refresh token'
        })
      }

      const { id } = verifiedRefreshToken as unknown as JwtAuthPayload

      const authToken = await prismaClient.authToken.findFirst({
        where: { user_id: id }
      })

      if (authToken?.refresh_token !== refreshToken) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Invalid refresh token'
        })
      }

      const user = await prismaClient.user.findUnique({
        where: { id }
      })

      const tokens = generateTokens(user?.id || '')

      res.status(StatusCodes.OK).json(tokens)
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Refresh token invalid error'
      })
    }
  }
}
