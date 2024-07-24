import ProfileController from './profile.controller'
import { ROUTER_PARAMS } from '@/configs/router-params.config'
import checkAuthMiddleware from '@/middlewares/access-token.middleware'
import { Router } from 'express'

const profileRouter = Router(ROUTER_PARAMS)

profileRouter
  .get('/posts', checkAuthMiddleware, ProfileController.myPosts)
  .get('/favorites', checkAuthMiddleware, ProfileController.myFavorites)

export default profileRouter
