import { postProfileSelect, postProfileUserSelect } from '../profile/profile.select'
import { createPostSelect, getOnePostSelect, getOnePostUserSelect } from './posts.select'
import {
  CreatePostPayload,
  DeletePostPayload,
  GetAllPostsPayload,
  GetOnePostPayload,
  LikesPayload,
  UpdatePostPayload
} from './ts/interfaces'
import {
  CreatePostResponse,
  DeletePostResponse,
  GetAllPostsResponse,
  GetOnePostResponse,
  LikePostResponse,
  UpdatePostResponse
} from './ts/types'
import { calcPagination } from '@/helpers/calc-pagination.helper'
import { calcTotalPages } from '@/helpers/calc-total-pages.helper'
import { logger } from '@/helpers/logger.helper'
import { prismaClient } from '@/libs/prisma-client.lib'
import { Prisma } from '@prisma/client'
import fs from 'node:fs/promises'

export default class PostsService {
  static async create(payload: CreatePostPayload, res: CreatePostResponse) {
    try {
      const post = await prismaClient.post.create({
        data: {
          image: payload.image,
          title: payload.title,
          desc: payload.desc,
          tags: payload.tags,
          content: payload.content,
          user_id: payload.userId
        },
        select: createPostSelect
      })

      res.status(201).json(post)
    } catch (err: any) {
      logger('post').error(`Create: ${err.message}`)

      res.status(500).json({
        message: 'Post create error'
      })
    }
  }

  static async update(payload: UpdatePostPayload, res: UpdatePostResponse) {
    try {
      const post = await prismaClient.post.findUnique({
        where: { id: payload.postId, user_id: payload.userId }
      })

      if (!post) {
        return res.status(404).json({
          message: 'Post not found'
        })
      }

      const updatedPost = await prismaClient.post.update({
        where: { id: payload.postId, user_id: payload.userId },
        data: {
          image: payload.image || post.image,
          title: payload.title || post.title,
          desc: payload.desc || post.desc,
          content: payload.content || post.content,
          tags: payload.tags || post.tags
        },
        select: createPostSelect
      })

      if (post.image && payload.image) {
        await fs.unlink(post.image)
      }

      res.status(200).json(updatedPost)
    } catch (err) {
      res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  static async delete(payload: DeletePostPayload, res: DeletePostResponse) {
    try {
      const post = await prismaClient.post.findUnique({
        where: { id: payload.postId, user_id: payload.userId }
      })

      if (!post) {
        return res.status(404).json({
          message: 'Post not found error'
        })
      }

      await prismaClient.post.delete({
        where: { id: payload.postId, user_id: payload.userId }
      })

      await fs.unlink(post.image)

      res.status(200).end()
    } catch (err: any) {
      logger('post').error(`Delete: ${err.message}`)

      res.status(500).json({
        message: 'Post delete error'
      })
    }
  }

  static async like(payload: LikesPayload, res: LikePostResponse) {
    try {
      const existingLike = await prismaClient.like.findFirst({
        where: {
          user_id: payload.userId,
          post_id: payload.postId
        }
      })

      if (existingLike) {
        await prismaClient.like.delete({
          where: {
            id: existingLike.id
          }
        })

        return res.status(200).json({ isLiked: false })
      } else {
        await prismaClient.like.create({
          data: {
            user_id: payload.userId,
            post_id: payload.postId
          }
        })

        return res.status(201).json({ isLiked: true })
      }
    } catch (err: any) {
      logger('post').error(`Like: ${err.message}`)

      res.status(500).json({ message: 'Like error' })
    }
  }

  static async getOne(payload: GetOnePostPayload, res: GetOnePostResponse) {
    try {
      const post = await prismaClient.post.findUnique({
        where: { id: payload.postId }
      })

      if (!post) {
        return res.status(404).json({
          message: 'Post not found'
        })
      }

      let isLikedByUser = false
      const likesLength = await prismaClient.like.count()
      const updatedPost = await prismaClient.post.update({
        where: { id: payload.postId },
        data: {
          views: post.views ? post.views + 1 : 1
        },
        select: {
          ...getOnePostSelect,
          user: { select: getOnePostUserSelect }
        }
      })

      if (payload.userId) {
        const userLiked = await prismaClient.like.findFirst({
          where: { post_id: payload.postId, user_id: payload.userId }
        })

        isLikedByUser = !!userLiked
      }

      res.status(200).json({
        ...updatedPost,
        likes: likesLength,
        isLiked: isLikedByUser
      })
    } catch (err: any) {
      logger('post').error(`Get one: ${err.message}`)

      res.status(500).json({
        message: 'Post server error'
      })
    }
  }

  static async getAll(payload: GetAllPostsPayload, res: GetAllPostsResponse) {
    try {
      const whereProperty: Prisma.PostWhereInput = {
        title: {
          contains: payload.search_text,
          mode: 'insensitive'
        }
      }

      const posts = await prismaClient.post.findMany({
        where: whereProperty,
        take: +payload.limit,
        skip: calcPagination(+payload.page, +payload.limit),
        select: {
          ...postProfileSelect,
          user: {
            select: postProfileUserSelect
          }
        },
        orderBy: {
          [payload.sort_by === 'date' ? 'created_at' : payload.sort_by]: payload.order
        }
      })

      const totalCount = await prismaClient.post.count({
        where: whereProperty
      })

      const totalPages = calcTotalPages(totalCount, +payload.limit)

      res.status(200).json({
        data: posts,
        pages: totalPages,
        posts: totalCount
      })
    } catch (err: any) {
      logger('post').error(`Get all: ${err.message}`)

      res.status(500).json({
        message: 'Posts server error'
      })
    }
  }
}
