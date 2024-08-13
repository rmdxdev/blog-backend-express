import { LogData } from '@/features/logs/ts/interfaces'
import { logger } from '@/helpers'
import { StatusCodes } from 'http-status-codes'
import { LogResponse } from './ts/types'

export default class LogsService {
  static notFound(link: LogData['link'], res: LogResponse) {
    logger('not-found').error(`Not Found: ${link}`)

    res.status(StatusCodes.OK).json({ message: 'The page logging was successful' })
  }
}
