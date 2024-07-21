import LogsController from '@/features/logs/logs.controller'
import { Router } from 'express'

const logsRouter = Router({ caseSensitive: true, strict: true })

logsRouter.post('/not-found', LogsController.notFound)

export default logsRouter
