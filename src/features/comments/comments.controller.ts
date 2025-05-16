import { Response } from 'express'
import CommentsService from './comments.service'
import {
  CommentCreateRequest,
  CommentDeleteRequest,
  CommentGetAllRequest,
  CommentUpdateRequest
} from './types'

export default class CommentsController {
  static create(req: CommentCreateRequest, res: Response) {
    return CommentsService.create(
      { userId: req.userId ?? '', postId: req.params.postId, text: req.body.text },
      res
    )
  }

  static delete(req: CommentDeleteRequest, res: Response) {
    return CommentsService.delete(
      {
        userId: req.userId ?? '',
        commentId: req.params.commentId
      },
      res
    )
  }

  static update(req: CommentUpdateRequest, res: Response) {
    return CommentsService.update(
      {
        text: req.body.text,
        userId: req.userId ?? '',
        commentId: req.params.commentId
      },
      res
    )
  }

  static getAll(req: CommentGetAllRequest, res: Response) {
    return CommentsService.getAll(
      {
        postId: req.params.postId,
        limit: req.query.limit ?? 10,
        offset: req.query.offset ?? 0
      },
      res
    )
  }
}
