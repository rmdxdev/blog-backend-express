import { TotalStatistic } from './interfaces'
import { NotifyResponse } from '@/types'
import { Response } from 'express'

export type TotalStatisticResponse = Response<TotalStatistic | NotifyResponse>
