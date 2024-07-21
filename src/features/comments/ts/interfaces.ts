import { AuthMiddlewareRequest } from '@/types'

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
