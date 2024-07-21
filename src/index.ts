import { API_PORT, API_URL } from './constants'
import authRouter from './features/auth/auth.route'
import commentsRouter from './features/comments/comments.route'
import logsRouter from './features/logs/logs.route'
import postsRouter from './features/posts/posts.route'
import profileRouter from './features/profile/profile.route'
import statisticsRouter from './features/statistics/statistics.route'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Request, Response, Router } from 'express'
import helmet from 'helmet'
import hpp from 'hpp'
import 'module-alias/register'
import swaggerUi from 'swagger-ui-express'
import { constants } from 'zlib'

const app = express()
app.use(helmet())
app.use(hpp())
app.use(compression({ level: constants.Z_BEST_SPEED }))
app.use(cors())
app.use(cookieParser())
app.use(express.json())

const apiRouter = Router()
app.use('/api', apiRouter)
app.use('/images', express.static('images'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

apiRouter.use('/auth', authRouter)
apiRouter.use('/logs', logsRouter)
apiRouter.use('/statistic', statisticsRouter)
apiRouter.use('/posts', postsRouter)
apiRouter.use('/profile', profileRouter)
apiRouter.use('/comments', commentsRouter)

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

app.listen(API_PORT ?? 5995, () => console.log('Server is running'))
