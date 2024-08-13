import { Response } from 'express'
import ProfileService from './profile.service'
import { ProfileEntitiesRequest } from './ts/types'

export default class ProfileController {
  static handleEntitiesRequest(
    req: ProfileEntitiesRequest,
    res: Response,
    method: 'posts' | 'favorites'
  ) {
    return ProfileService[method](
      {
        page: req.query.page ?? 1,
        limit: req.query.limit ?? 10,
        sort_by: req.query.sort_by ?? 'date',
        order: req.query.order === 'asc' ? 'asc' : 'desc',
        search_text: req.query.search_text || '',
        userId: req.userId ?? ''
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
