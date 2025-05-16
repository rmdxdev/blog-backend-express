import { JWT_ACCESS_TOKEN_SECRET } from '@/constants'
import { getAccessTokenFromHeader } from '@/helpers'
import { JwtAuthPayload } from '@/types'
import { Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import PostsService from './posts.service'
import {
  CreatePostRequest,
  DeletePostRequest,
  GetAllPostsRequest,
  GetOnePostRequest,
  LikeRequest,
  UpdatePostRequest
} from './types'

export default class PostsController {
  static create(req: CreatePostRequest, res: Response) {
    return PostsService.create(
      {
        desc: req.body.desc,
        tags: req.body.tags,
        title: req.body.title,
        userId: req.userId ?? '',
        content: req.body.content,
        image: `images/${req.file?.filename}`
      },
      res
    )
  }

  static delete(req: DeletePostRequest, res: Response) {
    return PostsService.delete(
      {
        userId: req.userId ?? '',
        postId: req.params.postId
      },
      res
    )
  }

  static update(req: UpdatePostRequest, res: Response) {
    return PostsService.update(
      {
        desc: req.body.desc,
        tags: req.body.tags,
        title: req.body.title,
        userId: req.userId ?? '',
        content: req.body.content,
        postId: req.params.postId,
        image: `images/${req.file?.filename}`
      },
      res
    )
  }

  static like(req: LikeRequest, res: Response) {
    return PostsService.like({ postId: req.params.postId, userId: req.userId ?? '' }, res)
  }

  static getOne(req: GetOnePostRequest, res: Response) {
    let tokenResult: null | string

    try {
      const token = getAccessTokenFromHeader(req.headers.authorization)
      const verifiedToken = jwt.verify(
        token,
        JWT_ACCESS_TOKEN_SECRET as Secret
      ) as unknown as JwtAuthPayload

      tokenResult = verifiedToken.id
    } catch (err) {
      tokenResult = null
    }

    return PostsService.getOne(
      {
        userId: tokenResult,
        postId: req.params.postId
      },
      res
    )
  }

  static getAll(req: GetAllPostsRequest, res: Response) {
    return PostsService.getAll(
      {
        page: req.query.page ?? 1,
        limit: req.query.limit ?? 10,
        sort_by: req.query.sort_by ?? 'date',
        search_text: req.query.search_text || '',
        order: req.query.order === 'asc' ? 'asc' : 'desc'
      },
      res
    )
  }
}
