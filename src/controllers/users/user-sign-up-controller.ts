import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { EmailNotAvailableException } from '@/errors/email-not-available.exception'
import { InvalidDataException } from '@/errors/invalid-data.exception'
import { userSignUpFactory } from '@/use-cases/users/factories/user-sign-up-factory'
import { createOneUserTeamFactory } from '@/use-cases/users-teams/factory/create-one-user-team-factory'

const userSignUpQuerySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  // user team
  userTeamId: z.string().optional(),
  userTeamName: z.string().optional(),
  userTeamCnpj: z.string().optional(),
})

export async function userSignUpController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      userTeamId: userTeamIdQuery,
      userTeamName,
      userTeamCnpj,
    } = userSignUpQuerySchema.parse(request.body)
    let userTeamId: string | undefined = userTeamIdQuery
    let isNewUserTeam: boolean = false
    let isUserTeamInvitation: boolean = false

    if (!userTeamId && !userTeamName && !userTeamCnpj) {
      throw new InvalidDataException('user team')
    }

    if (!userTeamId && userTeamName && userTeamCnpj) {
      isNewUserTeam = true
    }

    if (userTeamId && !userTeamName && !userTeamCnpj) {
      isUserTeamInvitation = true
    }

    // TODO: é possível que o time seja criado e o usuario dê erro, isso pode causar um bug
    if (isNewUserTeam && !isUserTeamInvitation) {
      const createUserTeamUseCase = createOneUserTeamFactory()
      const { userTeam } = await createUserTeamUseCase.execute({
        name: userTeamName!,
        cnpj: userTeamCnpj!,
      })
      userTeamId = userTeam.id
    }

    if (!userTeamId) {
      throw new InvalidDataException('user')
    }

    const userSignUpUseCase = userSignUpFactory()
    await userSignUpUseCase.execute({
      firstName,
      lastName,
      email,
      password,
      userTeamId,
    })
  } catch (err) {
    if (err instanceof EmailNotAvailableException) {
      return reply.status(err.code).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
