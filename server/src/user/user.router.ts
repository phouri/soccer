import { Router } from 'express'
import { getSelfUser } from '@/user/user.controller'

export const userRouter = Router()

userRouter.get('/me', getSelfUser)

