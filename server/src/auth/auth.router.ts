import { Router } from 'express'
import { registerUser, login } from '@/auth/auth.controller'

export const authRouter = Router()

authRouter.put('/register', registerUser)
authRouter.post('/login', login)

