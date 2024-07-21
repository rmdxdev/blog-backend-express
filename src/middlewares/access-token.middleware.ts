import { getAccessTokenFromHeader } from '@/helpers/get-access-token-from-header.helper'
import { findAuthToken, verifyAccessToken } from '@/helpers/token-actions.helper'
import { AuthMiddlewareRequest } from '@/types'
import 'dotenv/config.js'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export default async (req: Request & AuthMiddlewareRequest, res: Response, next: NextFunction) => {
  try {
    const accessToken = getAccessTokenFromHeader(req.headers.authorization)

    if (!accessToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No access' })
    }

    const decoded = verifyAccessToken(accessToken)

    await findAuthToken(decoded.id, accessToken)

    req.userId = decoded.id

    next()
  } catch (error: any) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message })
  }
}
