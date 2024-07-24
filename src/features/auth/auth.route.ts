import AuthController from './auth.controller'
import AuthValidation from './auth.validation'
import { validationErrors } from '@/helpers/validation-errors.helper'
import checkAuthMiddleware from '@/middlewares/access-token.middleware'
import { Router } from 'express'

const authRouter = Router({ caseSensitive: true, strict: true })

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
