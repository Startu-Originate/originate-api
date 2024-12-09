import { env } from './env'

export const corsOptions = {
  origin: env.CORS_ORIGIN_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}
