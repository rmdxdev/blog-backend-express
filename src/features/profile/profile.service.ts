import { postProfileSelect, postProfileUserSelect } from './profile.select'
import { ProfileEntitiesPayload } from './ts/interfaces'
import { ProfileEntitiesResponse } from './ts/types'
import { calcPagination, calcTotalPages, logger } from '@/helpers'
import { prismaClient } from '@/libs/prisma-client.lib'
import { Prisma } from '@prisma/client'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

export default class ProfileService {
  private static async getProfilePosts(
    where: Prisma.PostWhereInput,
    payload: ProfileEntitiesPayload
  ) {
    const posts = await prismaClient.post.findMany({
      where,
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

    const totalCount = await prismaClient.post.count({ where })
    const totalPages = calcTotalPages(totalCount, +payload.limit)

    return {
      data: posts,
      posts: totalCount,
      pages: totalPages
    }
  }

  static async posts(payload: ProfileEntitiesPayload, res: ProfileEntitiesResponse) {
    try {
      const whereProperty: Prisma.PostWhereInput = {
        user_id: payload.userId,
        title: {
          contains: payload.search_text,
          mode: 'insensitive'
        }
      }

      const { data, posts, pages } = await this.getProfilePosts(whereProperty, payload)

      res.status(StatusCodes.OK).json({
        data,
        pages,
        posts
      })
    } catch (err: any) {
      logger('profile').error(`Posts: ${err.message}`)

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: ReasonPhrases.INTERNAL_SERVER_ERROR
      })
    }
  }

  static async favorites(payload: ProfileEntitiesPayload, res: ProfileEntitiesResponse) {
    try {
      const whereProperty: Prisma.PostWhereInput = {
        likes: {
          some: {
            user_id: payload.userId
          }
        },
        user_id: payload.userId,
        title: {
          contains: payload.search_text,
          mode: 'insensitive'
        }
      }

      const { data, posts, pages } = await this.getProfilePosts(whereProperty, payload)

      res.status(StatusCodes.OK).json({
        data,
        pages,
        posts
      })
    } catch (err: any) {
      logger('profile').error(`Favorites: ${err.message}`)

      res.status(500).json({
        message: ReasonPhrases.INTERNAL_SERVER_ERROR
      })
    }
  }
}
