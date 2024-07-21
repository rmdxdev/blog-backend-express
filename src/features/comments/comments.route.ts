import CommentsController from './comments.controller'
import CommentsValidation from './comments.validation'
import accessTokenMiddleware from '@/middlewares/access-token.middleware'
import { validationErrors } from '@/helpers/validation-errors.helper'
import { Router } from 'express'

const commentsRouter = Router({ caseSensitive: true, strict: true })

commentsRouter
  .post(
    '/:postId',
    accessTokenMiddleware,
    CommentsValidation.createAndUpdate,
    validationErrors,
    CommentsController.create
  )
  .patch(
    '/:commentId',
    accessTokenMiddleware,
    CommentsValidation.createAndUpdate,
    validationErrors,
    CommentsController.update
  )
  .delete('/:commentId', accessTokenMiddleware, CommentsController.delete)
  .get('/:postId', CommentsController.getAll)

export default commentsRouter
