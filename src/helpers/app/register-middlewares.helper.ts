import { CLIENT_URL } from '@/constants'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Express, Router } from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import hpp from 'hpp'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { constants } from 'zlib'

const limiter = rateLimit({
  limit: 50,
  windowMs: 1000,
  handler: (_, res) => {
    res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      message: ReasonPhrases.TOO_MANY_REQUESTS
    })
  }
})

export const registerMiddlewares = (app: Express, router: Router) => {
  app.use(helmet())
  app.use(hpp())
  app.use(compression({ level: constants.Z_BEST_SPEED }))
  app.use(cors({ origin: CLIENT_URL, optionsSuccessStatus: 200 }))
  app.use(cookieParser())
  app.use(express.json())

  app.use('/api', limiter)
  app.use('/api', router)
  app.use('/images', express.static('images'))
}
