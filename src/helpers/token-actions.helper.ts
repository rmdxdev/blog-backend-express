import { JWT_ACCESS_TOKEN_SECRET } from '@/constants'
import { prismaClient } from '@/libs/prisma-client.lib'
import { JwtAuthPayload } from '@/types'
import jwt, { Secret } from 'jsonwebtoken'

export const verifyAccessToken = (accessToken: string): JwtAuthPayload => {
  try {
    return jwt.verify(accessToken, JWT_ACCESS_TOKEN_SECRET as Secret) as JwtAuthPayload
  } catch (error) {
    throw new Error('Invalid access token')
  }
}

export const findAuthToken = async (userId: string, accessToken: string) => {
  const authToken = await prismaClient.authToken.findFirst({
    where: { user_id: userId }
  })

  if (!authToken || authToken.access_token !== accessToken) {
    throw new Error('No access')
  }
}
