import { TotalStatisticResponse } from './ts/types'
import { logger } from '@/helpers'
import { prismaClient } from '@/libs/prisma-client.lib'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

export default class StatisticsService {
  static async total(res: TotalStatisticResponse) {
    try {
      const users = await prismaClient.user.count()
      const posts = await prismaClient.post.count()
      const views = await prismaClient.post.aggregate({ _sum: { views: true } })

      const statisticData = {
        users,
        posts,
        views: views._sum.views || 0
      }

      res.status(StatusCodes.OK).json(statisticData)
    } catch (err: any) {
      logger('statistic').error(`Total: ${err.message}`)

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: ReasonPhrases.INTERNAL_SERVER_ERROR
      })
    }
  }
}
