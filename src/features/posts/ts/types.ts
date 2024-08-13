import { postProfileSelect } from '@/features/profile/profile.select'
import { AuthMiddlewareRequest, NotifyResponse } from '@/types'
import { Post, User } from '@prisma/client'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { createPostSelect, getOnePostSelect, getOnePostUserSelect } from '../posts.select'
import { CommonPostParams, CreatePostData, PostsEntityQueries } from './interfaces'

type GetAllPost = Pick<Post, keyof typeof postProfileSelect>
type CreatePost = Pick<Post, keyof typeof createPostSelect>
type GetOnePost = Pick<Post, keyof typeof getOnePostSelect>
type GetOnePostUser = Pick<User, keyof typeof getOnePostUserSelect>

export type CreatePostRequest = Request<any, any, CreatePostData> & AuthMiddlewareRequest
export type DeletePostRequest = Request<CommonPostParams & ParamsDictionary> & AuthMiddlewareRequest
export type UpdatePostRequest = Request<CommonPostParams & ParamsDictionary> & AuthMiddlewareRequest
export type GetOnePostRequest = Request<CommonPostParams>
export type LikeRequest = Request<CommonPostParams & ParamsDictionary> & AuthMiddlewareRequest
export type GetAllPostsRequest = Request<any, any, any, PostsEntityQueries>

export type CreatePostResponse = Response<CreatePost | NotifyResponse>
export type DeletePostResponse = Response<NotifyResponse>
export type UpdatePostResponse = Response<CreatePost | NotifyResponse>
export type LikePostResponse = Response<{ isLiked: boolean } | NotifyResponse>
export type GetOnePostResponse = Response<
  (GetOnePost & { user: GetOnePostUser } & { likes: number; isLiked?: boolean }) | NotifyResponse
>
export type GetAllPostsResponse = Response<
  { data: GetAllPost[]; posts: number; pages: number } | NotifyResponse
>
