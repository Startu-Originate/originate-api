import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import { fastifyMultipart } from '@fastify/multipart'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { appUserRoutes } from '@/controllers/users/@users-routes'

import { corsOptions } from './config/cors-options'
import { env } from './config/env'

export const app = fastify({
  logger: true,
})
app.register(fastifyJwt, {
  secret: env.AUTH_SECRET,
})
app.register(cors, corsOptions)
app.register(fastifyMultipart)

// Rotas da aplicação
app.register(appUserRoutes)

// Middleware de tratamento de erros
// TODO: melhorar esse tratamento e talvez usar new relic ou algo do tipo
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    console.error(error)
    // TODO: Integrate with Sentry and PINO
  }

  return reply.status(500).send({ message: 'Internal server error. ❌' })
})
