import { NotifyResponse } from '@/types'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

export type LogResponse = Response<NotifyResponse>
export type LogRequest = Request<ParamsDictionary, any, LogData>

export interface LogData {
  link: string
}
