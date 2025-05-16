import { registerMiddlewares, registerRoutes } from '@/helpers'
import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import 'module-alias/register'
import { API_PORT } from './constants'

const app = express()
const router = Router()

registerMiddlewares(app, router)
registerRoutes(router)

app.use((req: Request, res: Response) => {
  const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: {
      request_url: url,
      message: `Unsupported ${req.method} request. Make sure you're making the request correctly`
    }
  })
})

app.listen(API_PORT, () => console.log(`Server is running on port ${API_PORT}`))
