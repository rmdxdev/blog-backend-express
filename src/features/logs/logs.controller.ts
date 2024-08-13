import { LogRequest, LogResponse } from '@/features/logs/ts/types'
import LogsService from './logs.service'

export default class LogsController {
  static notFound(req: LogRequest, res: LogResponse) {
    return LogsService.notFound(req.body.link, res)
  }
}
