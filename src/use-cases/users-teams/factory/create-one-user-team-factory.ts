import { PrismaUsersTeamsRepository } from '@/repositories/prisma-repositories/prisma-users-teams-repository'

import { CreateOneUserTeamUseCase } from '../create-one-user-team-use-case'

export function createOneUserTeamFactory() {
  const usersTeamsRepository = new PrismaUsersTeamsRepository()
  const createOneUserTeamUseCase = new CreateOneUserTeamUseCase(
    usersTeamsRepository,
  )

  return createOneUserTeamUseCase
}
