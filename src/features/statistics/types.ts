import { NotifyResponse } from '@/types'
import { Response } from 'express'

export type TotalStatisticResponse = Response<TotalStatistic | NotifyResponse>

export interface TotalStatistic {
  users: number
  posts: number
  views: number
}
