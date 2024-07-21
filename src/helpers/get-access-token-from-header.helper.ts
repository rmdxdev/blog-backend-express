export const getAccessTokenFromHeader = (authHeader: string | undefined) =>
  (authHeader || '').replace(/Bearer\s?/, '')
