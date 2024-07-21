import { commentSelect, commentUserSelect } from '../comments.select'
import {
  CreateAndGetCommentParams,
  CreateAndUpdateCommentData,
  DeleteAndUpdateCommentParams,
  GetAllCommentsQueries
} from './interfaces'
import { AuthMiddlewareRequest, NotifyResponse } from '@/types'
import { Comment, User } from '@prisma/client'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

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
