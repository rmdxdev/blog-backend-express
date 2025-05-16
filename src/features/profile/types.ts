import { AuthMiddlewareRequest, NotifyResponse, Order } from '@/types'
import { Post } from '@prisma/client'
import { Request, Response } from 'express'
import { postProfileSelect } from './profile.select'

type ProfilePost = Pick<Post, keyof typeof postProfileSelect>

export type ProfileEntitiesRequest = Request<any, any, any, ProfileEntityQueries & qs.ParsedQs> &
  AuthMiddlewareRequest
export type ProfileEntitiesResponse = Response<
  { data: ProfilePost[]; pages: number; posts: number } | NotifyResponse
>

export interface ProfileEntityQueries {
  page: string
  limit: string
  sort_by?: string
  search_text?: string
  order?: Order | string
}

export interface ProfileEntitiesPayload
  extends Required<ProfileEntityQueries>,
    Required<AuthMiddlewareRequest> {}
