import { postProfileSelect } from '../profile.select'
import { ProfileEntityQueries } from './interfaces'
import { AuthMiddlewareRequest, NotifyResponse } from '@/types'
import { Post } from '@prisma/client'
import { Request, Response } from 'express'

type ProfilePost = Pick<Post, keyof typeof postProfileSelect>

export type ProfileEntitiesRequest = Request<any, any, any, ProfileEntityQueries & qs.ParsedQs> &
  AuthMiddlewareRequest
export type ProfileEntitiesResponse = Response<
  { data: ProfilePost[]; pages: number; posts: number } | NotifyResponse
>
