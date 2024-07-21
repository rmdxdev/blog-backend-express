import StatisticsService from './statistics.service'
import { Request, Response } from 'express'

export default class StatisticsController {
  static async total(_: Request, res: Response) {
    return StatisticsService.total(res)
  }
}
