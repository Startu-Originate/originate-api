import type { UserTeam } from '@prisma/client'

import { CNPJNotAvailableException } from '@/errors/cnpj-not-available.exception'
import type { UsersTeamsRepository } from '@/repositories/users-teams-repository'

interface CreateOneUserTeamUseCaseRequest {
  name: string
  cnpj: string
}

interface CreateOneUserTeamUseCaseReply {
  userTeam: UserTeam
}

export class CreateOneUserTeamUseCase {
  constructor(private readonly usersTeamsRepository: UsersTeamsRepository) {}

  async execute({
    name,
    cnpj,
  }: CreateOneUserTeamUseCaseRequest): Promise<CreateOneUserTeamUseCaseReply> {
    const existingCompany = await this.usersTeamsRepository.findOneByCnpj(cnpj)
    if (existingCompany) {
      throw new CNPJNotAvailableException()
    }

    const userTeam = await this.usersTeamsRepository.createOne({
      name,
      cnpj,
    })

    return {
      userTeam,
    }
  }
}
