import StatisticsController from './statistics.controller'
import { ROUTER_PARAMS } from '@/configs/router-params.config'
import { Router } from 'express'

const statisticsRouter = Router(ROUTER_PARAMS)

statisticsRouter.get('/total', StatisticsController.total)

export default statisticsRouter
