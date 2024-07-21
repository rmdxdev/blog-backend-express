import { VALIDATION, VALIDATION_MESSAGES } from '@/configs/validation.config'
import { body } from 'express-validator'

export default class CommentsValidation {
  static createAndUpdate = [
    body('text')
      .isString()
      .withMessage(VALIDATION_MESSAGES.string)
      .isLength({ min: VALIDATION.commentMinLength })
      .withMessage(VALIDATION_MESSAGES.commentMinLength)
      .escape()
  ]
}
