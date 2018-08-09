import { ExpressRequest, ExpressResponse, ExpressNextFunction } from '^/types/express.d'

export async function getSelfUser(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
  if (req.user) {
    res.send({ user: req.user })
  } else {
    res.send({ user: null })
  }
}
