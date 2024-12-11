import { PrismaUsersRepository } from '@/repositories/prisma-repositories/prisma-users-repository'

import { UserSignInUseCase } from '../user-sign-in-use-case'

export function userSignInFactory() {
  const usersRepository = new PrismaUsersRepository()
  const userSignInUseCase = new UserSignInUseCase(usersRepository)

  return userSignInUseCase
}
