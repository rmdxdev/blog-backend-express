type Env = 'production' | 'development'

declare namespace NodeJS {
  interface ProcessEnv {
    JWT_ACCESS_TOKEN: string
    JWT_REFRESH_TOKEN: string
    BCRYPT_SALT: string
    API_PORT: string
    SMTP_SERVICE: string
    SMTP_PORT: string
    SMTP_EMAIL: string
    SMTP_PASSWORD: string
    NODE_ENV: Env
  }
}
