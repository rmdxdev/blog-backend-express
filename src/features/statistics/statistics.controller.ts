import { Request, Response } from 'express'
import StatisticsService from './statistics.service'

export default class StatisticsController {
  static async total(_: Request, res: Response) {
    return StatisticsService.total(res)
  }
}
