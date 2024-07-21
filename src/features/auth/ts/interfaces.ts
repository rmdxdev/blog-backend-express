export interface RegisterData {
  username: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export interface SendResetLinkData {
  email: string
}

export interface ResetPasswordData {
  password: string
}

export interface ResetPasswordParams {
  id: string
  token: string
}

export interface ForgotPasswordPayload extends SendResetLinkData {
  lang: string
}

export interface RefreshTokensData {
  refresh_token: string
}

export interface ResetPasswordPayload extends ResetPasswordParams, ResetPasswordData {}
