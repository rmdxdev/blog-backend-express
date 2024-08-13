import { ROUTER_PARAMS } from '@/configs'
import { validationErrors } from '@/helpers'
import accessTokenMiddleware from '@/middlewares/access-token.middleware'
import { Router } from 'express'
import CommentsController from './comments.controller'
import CommentsValidation from './comments.validation'

const commentsRouter = Router(ROUTER_PARAMS)

commentsRouter
  .post(
    '/:postId',
    accessTokenMiddleware,
    CommentsValidation.createAndUpdate,
    validationErrors,
    CommentsController.create
  )
  .put(
    '/:commentId',
    accessTokenMiddleware,
    CommentsValidation.createAndUpdate,
    validationErrors,
    CommentsController.update
  )
  .delete('/:commentId', accessTokenMiddleware, CommentsController.delete)
  .get('/:postId', CommentsController.getAll)

export default commentsRouter
