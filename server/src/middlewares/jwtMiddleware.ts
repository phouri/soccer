import { JWTToken } from 'types/express'
import { ExpressRequest, ExpressResponse, ExpressNextFunction } from 'types/express'
import config from 'config'
import * as jwt from 'jsonwebtoken'
import { User, UserModel } from '@/models/User'


function setUser(req: ExpressRequest, user: UserModel) {
  req.authenticated = true
  req.user = user
}

export async function setJwt(req: ExpressRequest, res: ExpressResponse, user: UserModel): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    jwt.sign({
      userId: user.id
    }, config.get('jwtSecret'), (err: Error, encoded: string) => {
      if (err) return reject(err)
      res.cookie('jwt', encoded, { maxAge: 1000 * 60 * 60 * 24 * 365 })
      setUser(req, user)
      resolve()
    })
  })
}

export default function(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
  req.authenticated = false
  req.jwt = {
    userId: null,
  }
  if (!req.cookies.jwt) {
    return next()
  }
  jwt.verify(req.cookies.jwt, config.get('jwtSecret'), async (err: jwt.VerifyErrors, token: JWTToken) => {
    if (err) {
      return next()
    } else {
      req.jwt = token
      if (token.userId) {
        try {
          const user = await User.findById(token.userId)
          if (user) {
            setUser(req, user)
          }
        } catch (_) {

        }
      }
      return next()
    }
  })
}
