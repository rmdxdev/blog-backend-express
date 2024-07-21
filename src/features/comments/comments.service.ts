import { commentSelect, commentUserSelect } from './comments.select'
import {
  CreateCommentPayload,
  DeleteCommentPayload,
  GetAllCommentsPayload,
  UpdateCommentPayload
} from './ts/interfaces'
import {
  CommentCreateResponse,
  CommentDeleteResponse,
  CommentGetAllResponse,
  CommentUpdateResponse
} from './ts/types'
import { logger } from '@/helpers/logger.helper'
import { prismaClient } from '@/libs/prisma-client.lib'

export default class CommentsService {
  static async create(payload: CreateCommentPayload, res: CommentCreateResponse) {
    try {
      const comment = await prismaClient.comment.create({
        data: {
          text: payload.text,
          user_id: payload.userId,
          post_id: payload.postId
        }
      })

      res.status(201).json(comment)
    } catch (err: any) {
      logger('comments').error(`Create: ${err.message}`)

      res.status(500).json({
        message: 'Failed to create a comment'
      })
    }
  }

  static async delete(payload: DeleteCommentPayload, res: CommentDeleteResponse) {
    try {
      const comment = await prismaClient.comment.findUnique({
        where: { id: payload.commentId, user_id: payload.userId }
      })

      if (!comment) {
        return res.status(404).json({
          message: 'Comment not found'
        })
      }

      if (comment && comment.user_id !== payload.userId) {
        return res.status(403).json({
          message: 'You can not delete a comment'
        })
      }

      await prismaClient.comment.delete({
        where: { id: payload.commentId }
      })

      res.status(200).end()
    } catch (err: any) {
      logger('comments').error(`Delete: ${err.message}`)

      res.status(500).json({
        message: 'Failed to delete a comment'
      })
    }
  }

  static async update(payload: UpdateCommentPayload, res: CommentUpdateResponse) {
    try {
      const comment = await prismaClient.comment.findUnique({
        where: { id: payload.commentId, user_id: payload.userId }
      })

      if (!comment) {
        return res.status(404).json({
          message: 'Comment not found'
        })
      }

      if (comment && comment.user_id !== payload.userId) {
        return res.status(403).json({
          message: 'You can not update a comment'
        })
      }

      await prismaClient.comment.update({
        where: { id: payload.commentId },
        data: {
          text: payload.text
        }
      })

      res.status(200).end()
    } catch (err: any) {
      logger('comments').error(`Update: ${err.message}`)

      res.status(500).json({
        message: 'Failed to update a comment'
      })
    }
  }

  static async getAll(payload: GetAllCommentsPayload, res: CommentGetAllResponse) {
    try {
      const comments = await prismaClient.comment.findMany({
        skip: +payload.offset,
        take: +payload.limit,
        where: { post_id: payload.postId },
        select: {
          ...commentSelect,
          user: { select: commentUserSelect }
        }
      })

      res.status(200).json(comments)
    } catch (err: any) {
      logger('comments').error(`Get: ${err.message}`)

      res.status(500).json({
        message: 'Failed to get comments'
      })
    }
  }
}
