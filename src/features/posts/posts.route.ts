import { validationErrors } from '@/helpers/validation-errors.helper'
import PostsController from './posts.controller'
import PostsValidation from './posts.validation'
import checkAuthMiddleware from '@/middlewares/access-token.middleware'
import { NextFunction, Request, Response, Router } from 'express'
import { MulterError } from 'multer'
import fs from 'node:fs/promises'
import sharp from 'sharp'
import { uploadImages } from '@/helpers/upload-images.helper'

const postsRouter = Router({ caseSensitive: true, strict: true })

const uploadPostImage = (req: Request, res: Response, next: NextFunction) => {
  const upload = uploadImages.single('image')

  upload(req, res, async function (err) {
    if (err instanceof MulterError || err) {
      return res.status(400).send({ message: err.message })
    }

    if (!req.file) {
      return res.status(400).send({ message: 'The image is empty' })
    }

    const fileNameWithoutType = req.file.filename.split('.')[0]
    const imageBuffer = await fs.readFile(req.file.path)
    const webpBuffer = await sharp(imageBuffer).webp().toBuffer()

    await fs.unlink(req.file.path)
    await fs.writeFile(`./images/${fileNameWithoutType}.webp`, webpBuffer)

    req.file.mimetype = 'image/webp'
    req.file.filename = `${fileNameWithoutType}.webp`
    req.file.path = `images/${fileNameWithoutType}.webp`

    next()
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
  .patch(
    '/:postId',
    checkAuthMiddleware,
    uploadPostImage,
    PostsValidation.post,
    validationErrors,
    PostsController.update
  )
  .get('/like/:postId', checkAuthMiddleware, PostsController.like)

export default postsRouter
