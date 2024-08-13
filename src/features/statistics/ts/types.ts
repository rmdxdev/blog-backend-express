import { NotifyResponse } from '@/types'
import { Response } from 'express'
import { TotalStatistic } from './interfaces'

export type TotalStatisticResponse = Response<TotalStatistic | NotifyResponse>
