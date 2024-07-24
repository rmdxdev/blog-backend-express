import PostsController from './posts.controller'
import PostsValidation from './posts.validation'
import { ROUTER_PARAMS } from '@/configs'
import { uploadImages, validationErrors } from '@/helpers'
import checkAuthMiddleware from '@/middlewares/access-token.middleware'
import { NextFunction, Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { MulterError } from 'multer'
import fs from 'node:fs/promises'
import sharp from 'sharp'

const postsRouter = Router(ROUTER_PARAMS)

const uploadPostImage = (req: Request, res: Response, next: NextFunction) => {
  const upload = uploadImages.single('image')

  upload(req, res, async function (err) {
    if (err instanceof MulterError || err) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: '1222' })
    }

    if (!req.file) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'The image is empty' })
    }

    try {
      const fileNameWithoutType = req.file.filename.split('.')[0]
      const imageBuffer = await fs.readFile(req.file.path)
      const webpBuffer = await sharp(imageBuffer).webp().toBuffer()

      await fs.unlink(req.file.path)
      await fs.writeFile(`./images/${fileNameWithoutType}.webp`, webpBuffer)

      req.file.mimetype = 'image/webp'
      req.file.filename = `${fileNameWithoutType}.webp`
      req.file.path = `images/${fileNameWithoutType}.webp`

      next()
    } catch (e) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: 'Error processing the image' })
    }
  })
}

postsRouter
  .post(
    '/',
    checkAuthMiddleware,
    uploadPostImage,
    PostsValidation.post,
    validationErrors,
    PostsController.create
  )
  .get('/:postId', PostsController.getOne)
  .get('/', PostsController.getAll)
  .delete('/:postId', checkAuthMiddleware, PostsController.delete)
  .put(
    '/:postId',
    checkAuthMiddleware,
    uploadPostImage,
    PostsValidation.post,
    validationErrors,
    PostsController.update
  )
  .get('/like/:postId', checkAuthMiddleware, PostsController.like)

export default postsRouter
