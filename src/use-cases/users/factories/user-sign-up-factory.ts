import { PrismaUsersRepository } from '@/repositories/prisma-repositories/prisma-users-repository'
import { PrismaUsersTeamsRepository } from '@/repositories/prisma-repositories/prisma-users-teams-repository'

import { UserSignUpUseCase } from '../user-sign-up-use-case'

export function userSignUpFactory() {
  const usersRepository = new PrismaUsersRepository()
  const usersTeamsRepository = new PrismaUsersTeamsRepository()
  const userSignUpUseCase = new UserSignUpUseCase(
    usersRepository,
    usersTeamsRepository,
  )

  return userSignUpUseCase
}
