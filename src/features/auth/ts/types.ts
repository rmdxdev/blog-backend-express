import { AuthMiddlewareRequest, NotifyResponse, Tokens } from '@/types'
import { ResetToken, User } from '@prisma/client'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { resetPasswordTokenSelect } from './../auth.select'
import {
  LoginData,
  RefreshTokensData,
  RegisterData,
  ResetPasswordData,
  ResetPasswordParams,
  SendResetLinkData
} from './interfaces'

type PublicUser = Omit<User, 'password'>
type Auth = PublicUser & { tokens: Tokens }

export type VerifyResetPasswordToken = Pick<ResetToken, keyof typeof resetPasswordTokenSelect>

export type RegisterRequest = Request<any, any, RegisterData>
export type LoginRequest = Request<any, any, LoginData>
export type LogoutRequest = Request & AuthMiddlewareRequest
export type SendPasswordLinkRequest = Request<any, any, SendResetLinkData>
export type ResetPasswordRequest = Request<
  ResetPasswordParams & ParamsDictionary,
  any,
  ResetPasswordData
>
export type VerifyResetPasswordRequest = Request<ResetPasswordParams, any, ResetPasswordData>
export type IdentifyRequest = Request & AuthMiddlewareRequest
export type RefreshTokensRequest = Request<any, any, RefreshTokensData>

export type AuthResponse = Response<Auth | NotifyResponse>
export type LogoutResponse = Response<NotifyResponse>
export type SendPasswordLinkResponse = Response<NotifyResponse>
export type VerifyResetPasswordResponse = Response<NotifyResponse>
export type ResetPasswordResponse = Response<NotifyResponse>
export type IdentifyResponse = Response<PublicUser | NotifyResponse>
