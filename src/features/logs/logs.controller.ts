import LogsService from './logs.service'
import { Request, Response } from 'express'

export default class LogsController {
  static notFound(req: Request, res: Response) {
    return LogsService.notFound(req, res)
  }
}
