import StatisticsController from './statistics.controller'
import { Router } from 'express'

const statisticsRouter = Router({ strict: true, caseSensitive: true })

statisticsRouter.get('/total', StatisticsController.total)

export default statisticsRouter
