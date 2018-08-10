import { authRouter } from '@/auth/auth.router'
import { userRouter } from '@/user/user.router'
import { ExpressRequest, ExpressResponse, ExpressNextFunction } from 'types/express'
import express = require('express')
import config from 'config'
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'
import * as cookieParser from 'cookie-parser'
import * as csrf from 'csurf'
import jwtMiddleware from '@/middlewares/jwtMiddleware';

export class App {
  app: express.Application
  mongoose: mongoose.Mongoose
  apiRouter: express.Router

  constructor() {
    this.app = express()
    this.addMiddlewares()
    this.addCsrfFreeRoutes()
    this.addCsrfMiddleware()
    this.addRoutes()
    this.start()
  }

  //no in use
  private addCsrfFreeRoutes(): void {}

  private addRoutes() {
    this.apiRouter = express.Router()
    this.apiRouter.use('/users', userRouter)
    this.apiRouter.use('/auth', authRouter)
    this.app.use('/api/v1', this.apiRouter)
  }

  private addCsrfMiddleware() {
    this.app.use(
      csrf({
        cookie: true,
      }),
    )
    this.app.use((req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
      res.cookie('XSRF-TOKEN', req.csrfToken())
      next()
    })
    this.app.use((err: any, req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
      if (err.code !== 'EBADCSRFTOKEN') return next(err)
      res.status(403)
      res.send('CSRF Error')
    })
  }

  private addMiddlewares(): void {
    this.app.use(morgan('common'))
    this.app.use(cookieParser(config.get('cookieSecret')))
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(jwtMiddleware)
  }

  private async start() {
    this.mongoose = await mongoose.connect(
      config.get('dbConnection'),
      { useNewUrlParser: true },
    )
    this.app.listen(config.get('port'), (e: any) => {
      if (e) {
        console.error('Error launching app', e)
      } else {
        console.log('All went better than expected... listening on ', config.get('port'))
      }
    })
  }
}
