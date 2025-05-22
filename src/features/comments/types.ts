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

interface CreateAndUpdateCommentData {
  text: string
}

interface DeleteAndUpdateCommentParams {
  commentId: string
}

interface CreateAndGetCommentParams {
  postId: string
}

interface GetAllCommentsQueries {
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
