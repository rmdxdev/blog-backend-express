import 'dotenv/config'

export const LOGGER_TIMESTAMP_FORMAT = 'D.MM.YYYY / HH:mm:ss'
export const IMAGE_MAX_SIZE = 10240 * 1024

export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN
export const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN

export const BCRYPT_SALT = process.env.BCRYPT_SALT
export const CLIENT_URL = 'http://localhost:5173'

export const DEFAULT_LANG = 'ru'

export const API_PORT = process.env.API_PORT
export const API_PORT_DEFAULT = 5995
export const API_URL = `http://localhost:${API_PORT || API_PORT_DEFAULT}`
