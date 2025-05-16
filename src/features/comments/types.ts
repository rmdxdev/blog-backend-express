import { AuthMiddlewareRequest, NotifyResponse } from '@/types'
import { Comment, User } from '@prisma/client'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { commentSelect, commentUserSelect } from './comments.select'

type ShortComment = Pick<Comment, keyof typeof commentSelect>
type CommentUser = Pick<User, keyof typeof commentUserSelect>

export type CommentCreateRequest = Request<
  CreateAndGetCommentParams & ParamsDictionary,
  any,
  CreateAndUpdateCommentData
> &
  AuthMiddlewareRequest

export type CommentGetAllRequest = Request<
  CreateAndGetCommentParams,
  any,
  any,
  GetAllCommentsQueries
>

export type CommentDeleteRequest = Request<DeleteAndUpdateCommentParams & ParamsDictionary> &
  AuthMiddlewareRequest

export type CommentUpdateRequest = Request<
  DeleteAndUpdateCommentParams & ParamsDictionary,
  any,
  CreateAndUpdateCommentData
> &
  AuthMiddlewareRequest

export type CommentCreateResponse = Response<Comment | NotifyResponse>
export type CommentUpdateResponse = Response<NotifyResponse>
export type CommentDeleteResponse = Response<NotifyResponse>
export type CommentGetAllResponse = Response<
  (ShortComment & { user: CommentUser })[] | NotifyResponse
>

export interface CreateAndUpdateCommentData {
  text: string
}

export interface DeleteAndUpdateCommentParams {
  commentId: string
}

export interface CreateAndGetCommentParams {
  postId: string
}

export interface GetAllCommentsQueries {
  limit: string
  offset: string
}

export interface DeleteCommentPayload
  extends Required<AuthMiddlewareRequest>,
    DeleteAndUpdateCommentParams {}

export interface CreateCommentPayload
  extends Required<AuthMiddlewareRequest>,
    CreateAndGetCommentParams,
    CreateAndUpdateCommentData {}

export interface UpdateCommentPayload
  extends Required<AuthMiddlewareRequest>,
    DeleteAndUpdateCommentParams,
    CreateAndUpdateCommentData {}

export interface UpdateCommentPayload extends Required<AuthMiddlewareRequest> {}

export interface GetAllCommentsPayload extends CreateAndGetCommentParams, GetAllCommentsQueries {}
