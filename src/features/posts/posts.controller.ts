import PostsService from './posts.service'
import {
  CreatePostRequest,
  DeletePostRequest,
  GetAllPostsRequest,
  GetOnePostRequest,
  LikeRequest,
  UpdatePostRequest
} from './ts/types'
import { JWT_ACCESS_TOKEN_SECRET } from '@/constants'
import { getAccessTokenFromHeader } from '@/helpers'
import { JwtAuthPayload } from '@/types'
import { Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'

export default class PostsController {
  static create(req: CreatePostRequest, res: Response) {
    return PostsService.create(
      {
        image: `images/${req.file?.filename}`,
        title: req.body.title,
        desc: req.body.desc,
        tags: req.body.tags,
        content: req.body.content,
        userId: req.userId ?? ''
      },
      res
    )
  }

  static delete(req: DeletePostRequest, res: Response) {
    return PostsService.delete(
      {
        postId: req.params.postId,
        userId: req.userId ?? ''
      },
      res
    )
  }

  static update(req: UpdatePostRequest, res: Response) {
    return PostsService.update(
      {
        image: `images/${req.file?.filename}`,
        title: req.body.title,
        desc: req.body.desc,
        tags: req.body.tags,
        content: req.body.content,
        postId: req.params.postId,
        userId: req.userId ?? ''
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
        postId: req.params.postId,
        userId: tokenResult
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
        order: req.query.order === 'asc' ? 'asc' : 'desc',
        search_text: req.query.search_text || ''
      },
      res
    )
  }
}
