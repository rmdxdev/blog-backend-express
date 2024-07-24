import { registerMiddlewares } from '@/helpers/app/register-middlewares.helper'
import { registerRoutes } from '@/helpers/app/register-routes.helper'
import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import 'module-alias/register'
import { API_PORT, API_PORT_DEFAULT, API_URL } from './constants'

const app = express()
const apiRouter = Router()

registerMiddlewares(app, apiRouter)
registerRoutes(apiRouter)

app.use((req: Request, res: Response) => {
  const method = req.method
  const url = `${API_URL}${req.originalUrl}`

  res.status(StatusCodes.NOT_FOUND).json({
    error: {
      message: `Unsupported ${method} request. Make sure you're making the request correctly`,
      request_url: url
    }
  })
})

app.listen(API_PORT ?? API_PORT_DEFAULT, () => console.log('Server is running'))
