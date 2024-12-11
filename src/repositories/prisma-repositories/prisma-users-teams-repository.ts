import type { Prisma } from '@prisma/client'

import { prisma } from '@/config/prisma'

import type { UsersTeamsRepository } from '../users-teams-repository'

export class PrismaUsersTeamsRepository implements UsersTeamsRepository {
  async createOne(data: Prisma.UserTeamUncheckedCreateInput) {
    const team = await prisma.userTeam.create({
      data,
    })
    return team
  }

  async findOneById(id: string) {
    const team = await prisma.userTeam.findUnique({
      where: {
        id,
      },
    })
    return team
  }

  async findOneByCnpj(cnpj: string) {
    const team = await prisma.userTeam.findUnique({
      where: {
        cnpj,
      },
    })
    return team
  }
}
