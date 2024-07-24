import StatisticsController from './statistics.controller'
import { ROUTER_PARAMS } from '@/configs'
import { Router } from 'express'

const statisticsRouter = Router(ROUTER_PARAMS)

statisticsRouter.get('/total', StatisticsController.total)

export default statisticsRouter
