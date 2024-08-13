import { ROUTER_PARAMS } from '@/configs'
import { validationErrors } from '@/helpers'
import checkAuthMiddleware from '@/middlewares/access-token.middleware'
import { Router } from 'express'
import AuthController from './auth.controller'
import AuthValidation from './auth.validation'

const authRouter = Router(ROUTER_PARAMS)

authRouter
  .post('/register', AuthValidation.register, validationErrors, AuthController.register)
  .post('/login', AuthValidation.login, validationErrors, AuthController.login)
  .get('/logout', checkAuthMiddleware, AuthController.logout)
  .post(
    '/forgot-password',
    AuthValidation.forgotPassword,
    validationErrors,
    AuthController.sendResetPasswordLink
  )
  .post(
    '/reset-password/:id/:token',
    AuthValidation.resetPassword,
    validationErrors,
    AuthController.resetPassword
  )
  .get('/verify-reset-password-token/:id/:token', AuthController.verifyResetPassword)
  .get('/identify', checkAuthMiddleware, AuthController.identify)
  .post(
    '/refresh-tokens',
    checkAuthMiddleware,
    AuthValidation.refreshTokens,
    validationErrors,
    AuthController.refreshTokens
  )

export default authRouter
