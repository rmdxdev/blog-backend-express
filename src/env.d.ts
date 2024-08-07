type Env = 'production' | 'development'

declare namespace NodeJS {
  interface ProcessEnv {
    readonly JWT_ACCESS_TOKEN: string
    readonly JWT_REFRESH_TOKEN: string
    readonly BCRYPT_SALT: string
    readonly API_PORT: string
    readonly SMTP_SERVICE: string
    readonly SMTP_PORT: string
    readonly SMTP_EMAIL: string
    readonly SMTP_PASSWORD: string
    readonly FRONTEND_URL: string
    readonly NODE_ENV: Env
  }
}
