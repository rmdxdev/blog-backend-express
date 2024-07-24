import { registerMiddlewares, registerRoutes } from '@/helpers'
import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import 'module-alias/register'
import { API_PORT, API_PORT_DEFAULT } from './constants'

const app = express()
const apiRouter = Router()

registerMiddlewares(app, apiRouter)
registerRoutes(apiRouter)

app.use((req: Request, res: Response) => {
  const method = req.method
  const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`

  res.status(StatusCodes.NOT_FOUND).json({
    error: {
      message: `Unsupported ${method} request. Make sure you're making the request correctly`,
      request_url: url
    }
  })
})

app.listen(API_PORT ?? API_PORT_DEFAULT, () => console.log('Server is running'))
