import type { Prisma, UserTeam } from '@prisma/client'

export interface UsersTeamsRepository {
  createOne(data: Prisma.UserTeamUncheckedCreateInput): Promise<UserTeam>
  findOneById(id: string): Promise<UserTeam | null>
  findOneByCnpj(cnpj: string): Promise<UserTeam | null>
}
