import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsException } from '@/errors/invalid-credentials-exception'
import { userSignInFactory } from '@/use-cases/users/factories/user-sign-in-factory'

export async function userSignInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password } = z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
    })
    .parse(request.body)

  try {
    const userSignInUseCase = userSignInFactory()
    const { user } = await userSignInUseCase.execute({
      email,
      password,
    })

    return reply.status(200).send({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsException) {
      return reply.status(err.code).send({ message: err.message })
    }
    throw err
  }
}
