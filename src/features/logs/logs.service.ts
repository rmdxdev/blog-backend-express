import { logger } from '@/helpers/logger.helper'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export default class LogsService {
  static notFound(req: Request, res: Response) {
    logger('not-found').error(`Not Found: ${req.body.link}`)
    res.status(StatusCodes.OK).end()
  }
}
