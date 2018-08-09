import { UserModel } from '@/models/User'
import { Request, Response, NextFunction } from 'express'

export interface JWTToken {
  userId: string | null
}

export interface ExpressRequest extends Request {
  jwt: JWTToken
  user?: UserModel
  authenticated: boolean
}

export interface ExpressResponse extends Response {}

export interface ExpressNextFunction extends NextFunction {}
