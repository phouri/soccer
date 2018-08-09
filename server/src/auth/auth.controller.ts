import { ExpressRequest, ExpressResponse, ExpressNextFunction } from 'types/express'
import { User } from '@/models/User'
import { NextFunction } from 'connect'
import { setJwt } from '@/middlewares/jwtMiddleware'

export async function login(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
  const { email, password } = req.body
  if (!email || !password) {
    return res.send({
      success: false,
    })
  }

  const user = await User.findOne({ email: email.trim().toLowerCase() })
  if (!user) {
    return res.send({
      success: false,
    })
  }

  const valid = await user.validatePassword(password)
  if (valid) {
    await setJwt(req, res, user)
    res.send({ user })
  } else {
    res.send({
      success: false
    })
  }
}

export async function getUser(req: ExpressRequest, res: ExpressResponse, next: NextFunction) {
  if (req.user) {
    res.send({ user: req.user })
  } else {
    res.send()
  }
}

export async function registerUser(req: ExpressRequest, res: ExpressResponse, next: NextFunction) {
  if (req.user) {
    return res.status(400).send()
  }
  const { email, password, firstName, lastName } = req.body
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).send()
  }
  const user = new User({
    email,
    firstName,
    lastName,
  })
  await user.setPassword(password)
  await user.save()
  await setJwt(req, res, user)
  res.send({ user })
}
