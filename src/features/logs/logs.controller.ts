import LogsService from './logs.service'
import { LogRequest } from '@/features/logs/ts/types'
import { Response } from 'express'

export default class LogsController {
  static notFound(req: LogRequest, res: Response) {
    return LogsService.notFound(req.body.link, res)
  }
}
