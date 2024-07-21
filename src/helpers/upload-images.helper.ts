import { IMAGE_MAX_SIZE } from '@/constants'
import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import fs from 'node:fs'
import * as path from 'path'
import { v4 as uuidv4 } from 'uuid'

const ALLOWED_IMAGES = ['image/jpg', 'image/jpeg', 'image/webp', 'image/png']

const storage = multer.diskStorage({
  destination(_, __, cb) {
    const path = 'images'

    fs.mkdirSync(path, { recursive: true })
    cb(null, path)
  },
  filename(_, file, cb) {
    const uniqueSuffix = uuidv4()
    const extname = path.extname(file.originalname)
    cb(null, uniqueSuffix + extname)
  }
})

const fileFilter = (_: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const imageType = file.mimetype

  if (ALLOWED_IMAGES.includes(imageType)) {
    cb(null, true)
  } else {
    cb(new Error('Invalid image type'))
  }
}

export const uploadImages = multer({ fileFilter, storage, limits: { fileSize: IMAGE_MAX_SIZE } })
