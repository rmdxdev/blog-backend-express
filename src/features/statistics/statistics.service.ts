import { TotalStatisticResponse } from './ts/types'
import { logger } from '@/helpers/logger.helper'
import { prismaClient } from '@/libs/prisma-client.lib'

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

      res.status(200).json(statisticData)
    } catch (err: any) {
      logger('statistic').error(`Total: ${err.message}`)

      res.status(500).json({
        message: 'There was an error when issuing statistic'
      })
    }
  }
}
