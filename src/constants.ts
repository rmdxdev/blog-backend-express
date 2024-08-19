import 'dotenv/config'

export const IMAGE_MAX_SIZE = 10240 * 1024

export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN
export const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN

export const BCRYPT_SALT = process.env.BCRYPT_SALT

export const DEFAULT_LANG = 'ru'






export const API_PORT = process.env.API_PORT

export const CLIENT_URL = process.env.FRONTEND_URL
