import { API_PORT, API_PORT_DEFAULT, API_URL } from './constants'
import { registerMiddlewares } from '@/helpers/app/register-middlewares.helper'
import { registerRoutes } from '@/helpers/app/register-routes.helper'
import express, { Request, Response, Router } from 'express'
import 'module-alias/register'

const app = express()
const apiRouter = Router()

registerMiddlewares(app, apiRouter)
registerRoutes(apiRouter)

app.use((req: Request, res: Response) => {
  const method = req.method
  const url = `${API_URL}${req.originalUrl}`

  res.status(404).json({
    error: {
      message: `Unsupported ${method} request. Make sure you're making the request correctly`,
      request_url: url
    }
  })
})

app.listen(API_PORT ?? API_PORT_DEFAULT, () => console.log('Server is running'))
