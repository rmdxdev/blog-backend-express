import { JWT_ACCESS_TOKEN_SECRET } from '@/constants'
import { getAccessTokenFromHeader } from '@/helpers/get-access-token-from-header.helper'
import { prismaClient } from '@/libs/prisma-client.lib'
import { AuthMiddlewareRequest, JwtAuthPayload } from '@/types'
import 'dotenv/config.js'
import { NextFunction, Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'

export default async (req: Request & AuthMiddlewareRequest, res: Response, next: NextFunction) => {
  try {
    const accessToken = getAccessTokenFromHeader(req.headers.authorization)

    if (!accessToken) {
      return res.status(401).json({
        message: 'No access'
      })
    }

    const decoded = jwt.verify(
      accessToken,
      JWT_ACCESS_TOKEN_SECRET as Secret
    ) as unknown as JwtAuthPayload

    const authToken = await prismaClient.authToken.findFirst({
      where: { user_id: decoded.id }
    })

    if (authToken?.access_token !== accessToken) {
      return res.status(401).json({
        message: 'No access'
      })
    }

    req.userId = decoded.id

    next()
  } catch (err: any) {
    res.status(401).json({
      message: 'No access'
    })
  }
}
