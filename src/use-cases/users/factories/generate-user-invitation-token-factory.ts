import { PrismaUsersRepository } from '@/repositories/prisma-repositories/prisma-users-repository'
import { PrismaUsersTeamsRepository } from '@/repositories/prisma-repositories/prisma-users-teams-repository'

import { GenerateUserInvitationTokenUseCase } from '../generate-user-invitation-token-use-case'

export function generateUserInvitationTokenFactory() {
  const usersRepository = new PrismaUsersRepository()
  const usersTeamsRepository = new PrismaUsersTeamsRepository()
  const generateUserInvitationTokenUseCase =
    new GenerateUserInvitationTokenUseCase(
      usersRepository,
      usersTeamsRepository,
    )

  return generateUserInvitationTokenUseCase
}
