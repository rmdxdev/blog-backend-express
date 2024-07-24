import { JwtPayload } from 'jsonwebtoken'

export type Nullable<T> = T | null

export type Order = 'asc' | 'desc'

export interface AuthMiddlewareRequest {
  userId?: string
}

export interface JwtAuthPayload extends JwtPayload {
  id: string
}

export interface NotifyResponse {
  message: string
}

export interface Tokens {
  access_token: string
  refresh_token: string
}
