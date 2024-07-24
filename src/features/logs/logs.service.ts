import { LogData } from '@/features/logs/ts/interfaces'
import { logger } from '@/helpers/logger.helper'
import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export default class LogsService {
  static notFound(link: LogData['link'], res: Response) {
    logger('not-found').error(`Not Found: ${link}`)
    res.status(StatusCodes.OK).end()
  }
}
