import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { EmailNotAvailableException } from '@/errors/email-not-available.exception'
import { generateUserInvitationTokenFactory } from '@/use-cases/users/factories/generate-user-invitation-token-factory'

const generateUserInvitationTokenQuerySchema = z.object({
  userEmail: z.string().email(),
  userTeamId: z.string(),
})

export async function generateUserInvitationTokenController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { userEmail, userTeamId } =
    generateUserInvitationTokenQuerySchema.parse(request.body)

  try {
    const generateUserInvitationTokenUseCase =
      generateUserInvitationTokenFactory()

    await generateUserInvitationTokenUseCase.execute({
      userEmail,
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
