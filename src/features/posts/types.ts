import { postProfileSelect } from '@/features/profile/profile.select'
import { AuthMiddlewareRequest, NotifyResponse, Order } from '@/types'
import { Post, User } from '@prisma/client'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { createPostSelect, getOnePostSelect, getOnePostUserSelect } from './posts.select'

type CreatePost = Pick<Post, keyof typeof createPostSelect>
type GetOnePost = Pick<Post, keyof typeof getOnePostSelect>
type GetAllPost = Pick<Post, keyof typeof postProfileSelect>
type GetOnePostUser = Pick<User, keyof typeof getOnePostUserSelect>

export type GetOnePostRequest = Request<CommonPostParams>
export type GetAllPostsRequest = Request<any, any, any, PostsEntityQueries>
export type CreatePostRequest = Request<any, any, CreatePostData> & AuthMiddlewareRequest
export type LikeRequest = Request<CommonPostParams & ParamsDictionary> & AuthMiddlewareRequest
export type DeletePostRequest = Request<CommonPostParams & ParamsDictionary> & AuthMiddlewareRequest
export type UpdatePostRequest = Request<CommonPostParams & ParamsDictionary> & AuthMiddlewareRequest

export type DeletePostResponse = Response<NotifyResponse>
export type CreatePostResponse = Response<CreatePost | NotifyResponse>
export type UpdatePostResponse = Response<CreatePost | NotifyResponse>
export type LikePostResponse = Response<{ isLiked: boolean } | NotifyResponse>
export type GetOnePostResponse = Response<
  (GetOnePost & { user: GetOnePostUser } & { likes: number; isLiked?: boolean }) | NotifyResponse
>
export type GetAllPostsResponse = Response<
  { data: GetAllPost[]; posts: number; pages: number } | NotifyResponse
>

export interface CreatePostData {
  desc: string
  title: string
  tags: string[]
  content: string
}

export interface CreatePostPayload extends CreatePostData {
  image: string
  userId: string
}

export interface PostsEntityQueries {
  page: string
  order?: Order
  limit: string
  sort_by?: string
  search_text?: string
}

export interface GetAllPostsPayload extends Required<PostsEntityQueries> {}

export interface UpdatePostPayload
  extends Required<AuthMiddlewareRequest>,
    CreatePostPayload,
    CommonPostParams {}

export interface LikesPayload extends Required<AuthMiddlewareRequest>, CommonPostParams {}

export interface CommonPostParams {
  postId: string
}

export interface GetOnePostPayload extends CommonPostParams {
  userId: string | null
}
export interface DeletePostPayload extends Required<AuthMiddlewareRequest>, CommonPostParams {}
export interface UpdatePostPayload extends Required<AuthMiddlewareRequest>, CommonPostParams {}
