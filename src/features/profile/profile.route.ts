import { ROUTER_PARAMS } from '@/configs'
import checkAuthMiddleware from '@/middlewares/access-token.middleware'
import { Router } from 'express'
import ProfileController from './profile.controller'

const profileRouter = Router(ROUTER_PARAMS)

profileRouter
  .get('/posts', checkAuthMiddleware, ProfileController.myPosts)
  .get('/favorites', checkAuthMiddleware, ProfileController.myFavorites)

export default profileRouter
