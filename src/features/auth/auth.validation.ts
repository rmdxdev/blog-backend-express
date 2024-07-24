import { VALIDATION, VALIDATION_MESSAGES } from '@/configs'
import { body } from 'express-validator'

export default class AuthValidation {
  static register = [
    body('username')
      .isString()
      .withMessage(VALIDATION_MESSAGES.string)
      .isLength({
        min: VALIDATION.usernameMinLength,
        max: VALIDATION.usernameMaxLength
      })
      .withMessage(VALIDATION_MESSAGES.usernameLength)
      .escape(),
    body('email')
      .isString()
      .withMessage(VALIDATION_MESSAGES.string)
      .isEmail()
      .withMessage(VALIDATION_MESSAGES.email)
      .escape(),
    body('password')
      .isString()
      .withMessage(VALIDATION_MESSAGES.string)
      .isLength({
        min: VALIDATION.passwordMinLength
      })
      .withMessage(VALIDATION_MESSAGES.passwordMinLength)
      .escape()
  ]

  static login = [
    body('email')
      .isString()
      .withMessage(VALIDATION_MESSAGES.string)
      .isEmail()
      .withMessage(VALIDATION_MESSAGES.email)
      .escape(),
    body('password')
      .isString()
      .withMessage(VALIDATION_MESSAGES.string)
      .isLength({ min: VALIDATION.passwordMinLength })
      .withMessage(VALIDATION_MESSAGES.passwordMinLength)
      .escape()
  ]

  static forgotPassword = [
    body('email')
      .isString()
      .withMessage(VALIDATION_MESSAGES.string)
      .isEmail()
      .withMessage(VALIDATION_MESSAGES.email)
      .escape()
  ]

  static resetPassword = [
    body('password')
      .isString()
      .withMessage(VALIDATION_MESSAGES.string)
      .isLength({ min: VALIDATION.passwordMinLength })
      .withMessage(VALIDATION_MESSAGES.passwordMinLength)
      .escape()
  ]

  static refreshTokens = [
    body('refresh_token').isString().withMessage(VALIDATION_MESSAGES.string).escape()
  ]
}
