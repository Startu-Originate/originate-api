import { EmailNotAvailableException } from '@/errors/email-not-available.exception'
import { UserTeamNotFoundException } from '@/errors/user-team-not-found.exception'
import type { UsersRepository } from '@/repositories/users-repository'
import type { UsersTeamsRepository } from '@/repositories/users-teams-repository'
import { generateInvitationJwt } from '@/utils/generate-invitation-jwt'

interface GenerateUserInvitationTokenUseCaseRequest {
  userEmail: string
  userTeamId: string
}

interface GenerateUserInvitationTokenUseCaseReply {
  token: string
}

export class GenerateUserInvitationTokenUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersTeamsRepository: UsersTeamsRepository,
  ) {}

  async execute({
    userEmail,
    userTeamId,
  }: GenerateUserInvitationTokenUseCaseRequest): Promise<GenerateUserInvitationTokenUseCaseReply> {
    const user = await this.usersRepository.findOneByEmail(userEmail)
    if (user) {
      throw new EmailNotAvailableException()
    }

    const userTeam = await this.usersTeamsRepository.findOneById(userTeamId)
    if (!userTeam) {
      throw new UserTeamNotFoundException()
    }

    const token = await generateInvitationJwt({ userEmail, userTeamId })

    return {
      token,
    }
  }
}
