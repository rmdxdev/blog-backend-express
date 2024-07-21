import { AuthMiddlewareRequest, SortOrder } from '@/types'

export interface CreatePostData {
  title: string
  desc: string
  tags: string[]
  content: string
}

export interface CreatePostPayload extends CreatePostData {
  image: string
  userId: string
}

export interface PostsEntityQueries {
  page: string
  limit: string
  sort_by?: string
  search_text?: string
  order?: SortOrder
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
