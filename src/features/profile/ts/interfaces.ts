import { AuthMiddlewareRequest, SortOrder } from '@/types'

export interface ProfileEntityQueries {
  page: string
  limit: string
  sort_by?: string
  search_text?: string
  order?: SortOrder | string
}

export interface ProfileEntitiesPayload
  extends Required<ProfileEntityQueries>,
    Required<AuthMiddlewareRequest> {}
