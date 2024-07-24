import { LogData } from '@/features/logs/ts/interfaces'
import { Request } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

export type LogRequest = Request<ParamsDictionary, any, LogData>
