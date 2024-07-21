import ProfileController from './profile.controller'
import checkAuthMiddleware from '@/middlewares/access-token.middleware'
import { Router } from 'express'

const profileRouter = Router({ caseSensitive: true, strict: true })

profileRouter
  .get('/posts', checkAuthMiddleware, ProfileController.myPosts)
  .get('/favorites', checkAuthMiddleware, ProfileController.myFavorites)

export default profileRouter
