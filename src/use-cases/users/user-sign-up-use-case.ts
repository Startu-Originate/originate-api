import type { User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { EmailNotAvailableException } from '@/errors/email-not-available.exception'
import { UserTeamNotFoundException } from '@/errors/user-team-not-found.exception'
import type { UsersRepository } from '@/repositories/users-repository'
import type { UsersTeamsRepository } from '@/repositories/users-teams-repository'

interface UserSignUpUseCaseRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  userTeamId: string
}

interface UserSignUpUseCaseResponse {
  user: User
}

export class UserSignUpUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersTeamsRepository: UsersTeamsRepository,
  ) {}

  async execute({
    firstName,
    lastName,
    email,
    password,
    userTeamId,
  }: UserSignUpUseCaseRequest): Promise<UserSignUpUseCaseResponse> {
    // It should prevent a user sign up with a duplicate email.
    const userWithSameEmail = await this.usersRepository.findOneByEmail(email)
    if (userWithSameEmail) {
      throw new EmailNotAvailableException()
    }

    // It should prevent a user sign up with an non-existent team company.
    const userTeam = await this.usersTeamsRepository.findOneById(userTeamId)
    if (!userTeam) {
      throw new UserTeamNotFoundException()
    }

    // It should hash user password upon registration.
    const passwordHash = await hash(password, 6)

    // It should allow to sign up a user.
    const user = await this.usersRepository.createOne({
      firstName,
      lastName,
      email,
      passwordHash,
      userTeamId,
    })

    return {
      user,
    }
  }
}
