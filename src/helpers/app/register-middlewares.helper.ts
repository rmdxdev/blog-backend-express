import { CLIENT_URL } from '@/constants'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Express, Router } from 'express'
import helmet from 'helmet'
import hpp from 'hpp'
import { constants } from 'zlib'

export const registerMiddlewares = (app: Express, router: Router) => {
  app.use(helmet())
  app.use(hpp())
  app.use(compression({ level: constants.Z_BEST_SPEED }))
  app.use(cors({ origin: CLIENT_URL, optionsSuccessStatus: 200 }))
  app.use(cookieParser())
  app.use(express.json())

  app.use('/api', router)
  app.use('/images', express.static('images'))
}
