import { VALIDATION, VALIDATION_MESSAGES } from '@/configs'
import { body } from 'express-validator'

export default class PostsValidation {
  static post = [
    body('title')
      .isString()
      .withMessage(VALIDATION_MESSAGES.string)
      .isLength({ min: VALIDATION.postTitleMinLength })
      .withMessage(VALIDATION_MESSAGES.titleMinLength)
      .escape(),
    body('desc')
      .isString()
      .withMessage(VALIDATION_MESSAGES.string)
      .isLength({ min: VALIDATION.descMinLength })
      .withMessage(VALIDATION_MESSAGES.descMinLength)
      .escape(),
    body('content')
      .isString()
      .withMessage(VALIDATION_MESSAGES.string)
      .isLength({ min: VALIDATION.contentMinLength })
      .withMessage(VALIDATION_MESSAGES.contentMinLength)
      .escape(),
    body('tags').optional().isArray().withMessage(VALIDATION_MESSAGES.array).escape()
  ]
}
