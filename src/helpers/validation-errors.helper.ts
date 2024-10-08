import { NextFunction, Request, Response } from 'express'
import { ValidationError, validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import fs from 'node:fs/promises'

export const validationErrors = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  const formattedErrors = errors.formatWith((err: ValidationError) => ({
    message: err.msg,
    field: err.type === 'field' ? err.path : null,
    value: err.type === 'field' ? err.value : null
  }))

  if (!errors.isEmpty()) {
    if (req.file) {
      await fs.unlink(req.file.path)
    }

    return res.status(StatusCodes.BAD_REQUEST).json(formattedErrors.array())
  }

  next()
}
