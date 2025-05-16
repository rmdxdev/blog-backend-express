import { Response } from 'express'
import ProfileService from './profile.service'
import { ProfileEntitiesRequest } from './types'

export default class ProfileController {
  static handleEntitiesRequest(
    req: ProfileEntitiesRequest,
    res: Response,
    method: 'posts' | 'favorites'
  ) {
    return ProfileService[method](
      {
        userId: req.userId ?? '',
        page: req.query.page ?? 1,
        limit: req.query.limit ?? 10,
        sort_by: req.query.sort_by ?? 'date',
        search_text: req.query.search_text || '',
        order: req.query.order === 'asc' ? 'asc' : 'desc'
      },
      res
    )
  }

  static myPosts(req: ProfileEntitiesRequest, res: Response) {
    return ProfileController.handleEntitiesRequest(req, res, 'posts')
  }

  static myFavorites(req: ProfileEntitiesRequest, res: Response) {
    return ProfileController.handleEntitiesRequest(req, res, 'favorites')
  }
}
