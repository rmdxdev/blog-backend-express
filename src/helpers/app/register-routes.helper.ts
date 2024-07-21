import authRouter from '@/features/auth/auth.route'
import commentsRouter from '@/features/comments/comments.route'
import logsRouter from '@/features/logs/logs.route'
import postsRouter from '@/features/posts/posts.route'
import profileRouter from '@/features/profile/profile.route'
import statisticsRouter from '@/features/statistics/statistics.route'
import { Router } from 'express'

export const registerRoutes = (router: Router) => {
  router.use('/auth', authRouter)
  router.use('/logs', logsRouter)
  router.use('/statistic', statisticsRouter)
  router.use('/posts', postsRouter)
  router.use('/profile', profileRouter)
  router.use('/comments', commentsRouter)
}
