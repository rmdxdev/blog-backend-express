import { ROUTER_PARAMS } from '@/configs'
import LogsController from '@/features/logs/logs.controller'
import { Router } from 'express'

const logsRouter = Router(ROUTER_PARAMS)

logsRouter.post('/not-found', LogsController.notFound)

export default logsRouter
