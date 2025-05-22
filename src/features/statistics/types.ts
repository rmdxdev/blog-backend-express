import { NotifyResponse } from '@/types'
import { Response } from 'express'

export type TotalStatisticResponse = Response<TotalStatistic | NotifyResponse>

interface TotalStatistic {
  users: number
  posts: number
  views: number
}
