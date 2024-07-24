import { AuthMiddlewareRequest, Order } from '@/types'

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
