import { z } from 'zod'

import { InvalidEnvironmentVariablesException } from '@/errors/invalid-environment-variables.exception'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  CORS_ORIGIN_URL: z
    .array(z.string())
    .default(['http://localhost:3000', 'https://app.originate.com.br']),
  PORT: z.coerce.number().default(3333),
  AUTH_SECRET: z.string(),
  BLOB_READ_WRITE_TOKEN: z.string(),
})

const { data, success, error } = envSchema.safeParse(process.env)

if (!success) {
  console.error('❌ :', error.format())
  throw new InvalidEnvironmentVariablesException()
}

export const env = data
