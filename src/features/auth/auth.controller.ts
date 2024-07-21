import AuthService from './auth.service'
import {
  IdentifyRequest,
  LoginRequest,
  LogoutRequest,
  RefreshTokensRequest,
  RegisterRequest,
  ResetPasswordRequest,
  SendPasswordLinkRequest,
  VerifyResetPasswordRequest
} from './ts/types'
import { Response } from 'express'

export default class AuthController {
  static register(req: RegisterRequest, res: Response) {
    return AuthService.register(
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      },
      res
    )
  }

  static login(req: LoginRequest, res: Response) {
    return AuthService.login({ email: req.body.email, password: req.body.password }, res)
  }

  static logout(req: LogoutRequest, res: Response) {
    return AuthService.logout(req.userId ?? '', res)
  }

  static sendResetPasswordLink(req: SendPasswordLinkRequest, res: Response) {
    return AuthService.sendResetPasswordLink(
      { email: req.body.email, lang: req.headers['x-user-language'] as string },
      res
    )
  }

  static verifyResetPassword(req: VerifyResetPasswordRequest, res: Response) {
    return AuthService.verifyResetPassword(
      {
        id: req.params.id,
        token: req.params.token
      },
      res
    )
  }

  static resetPassword(req: ResetPasswordRequest, res: Response) {
    return AuthService.resetPassword(
      { id: req.params.id, token: req.params.token, password: req.body.password },
      res
    )
  }

  static identify(req: IdentifyRequest, res: Response) {
    return AuthService.identify(req.userId ?? '', res)
  }

  static refreshTokens(req: RefreshTokensRequest, res: Response) {
    return AuthService.refreshTokens(req.body.refresh_token, res)
  }
}
