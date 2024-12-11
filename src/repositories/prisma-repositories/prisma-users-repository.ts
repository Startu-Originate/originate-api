import type { Prisma } from '@prisma/client'

import { prisma } from '@/config/prisma'

import type { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async createOne(data: Prisma.UserUncheckedCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }

  async findOneById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }

  async findOneByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }
}
