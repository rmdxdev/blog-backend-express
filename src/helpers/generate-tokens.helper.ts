import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from '@/constants'
import { Tokens } from '@/types'
import jwt, { Secret } from 'jsonwebtoken'

export const generateTokens = (id: string): Tokens => {
  const data = { id }

  const accessToken = jwt.sign(data, JWT_ACCESS_TOKEN_SECRET as Secret, {
    expiresIn: '1d'
  })

  const refreshToken = jwt.sign(data, JWT_REFRESH_TOKEN_SECRET as Secret, {
    expiresIn: '7d'
  })

  return {
    access_token: accessToken,
    refresh_token: refreshToken
  }
}
