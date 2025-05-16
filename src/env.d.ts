type Env = 'production' | 'development'

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: Env
    readonly API_PORT: string
    readonly SMTP_PORT: string
    readonly SMTP_EMAIL: string
    readonly BCRYPT_SALT: string
    readonly FRONTEND_URL: string
    readonly SMTP_SERVICE: string
    readonly SMTP_PASSWORD: string
    readonly JWT_ACCESS_TOKEN: string
    readonly JWT_REFRESH_TOKEN: string
  }
}
