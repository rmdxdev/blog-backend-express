import { LogData } from '@/features/logs/ts/interfaces'
import { NotifyResponse } from '@/types'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

export type LogRequest = Request<ParamsDictionary, any, LogData>

export type LogResponse = Response<NotifyResponse>
