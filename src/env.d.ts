declare namespace NodeJS {
  interface ProcessEnv {
    JWT_ACCESS_TOKEN: string
    JWT_REFRESH_TOKEN: string
    BCRYPT_SALT: string
    API_PORT: string
  }
}
