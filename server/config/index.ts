import * as convict from 'convict'

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 4567,
    env: 'PORT',
    arg: 'port',
  },
  cookieSecret: {
    doc: 'the cookies secret',
    format: String,
    default: 'well, what do I care, just do what you want, hack this thanks',
    env: 'COOKIE_SECRET',
  },
  jwtSecret: {
    doc: 'the jwt secret',
    format: String,
    default: 'well, what do I care, just do what you want, hack this thanks',
    env: 'JWT_SECRET',
  },
  dbConnection: {
    doc: 'Db Url Connection',
    format: String,
    default: 'mongodb://localhost:27017/dev',
    env: 'DB_CONNECTION'
  }
})

const env = config.get('env')

config.loadFile([`${__dirname}/${env}.json`])

export default config
