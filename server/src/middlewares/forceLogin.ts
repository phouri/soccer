import { ExpressRequest, ExpressResponse, ExpressNextFunction } from 'types/express'
export default function(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
  if (!req.authenticated) {
    return res.status(401).send()
  }
  return next()
}
