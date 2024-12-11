import type { User } from '@prisma/client'
import { compare } from 'bcryptjs'

import { InvalidCredentialsException } from '@/errors/invalid-credentials-exception'
import type { UsersRepository } from '@/repositories/users-repository'

interface UserSignInUseCaseRequest {
  email: string
  password: string
}

interface UserSignInUseCaseReply {
  user: User
}

export class UserSignInUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: UserSignInUseCaseRequest): Promise<UserSignInUseCaseReply> {
    // It should prevent user authenticate with wrong email.
    const user = await this.usersRepository.findOneByEmail(email)
    if (!user) {
      throw new InvalidCredentialsException()
    }

    // It should prevent user authenticate with wrong password.
    const doesPasswordMatch = await compare(password, user.passwordHash)
    if (!doesPasswordMatch) {
      throw new InvalidCredentialsException()
    }

    // It should allow user authenticate.
    return {
      user,
    }
  }
}
