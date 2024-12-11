import type { Lead, Prisma } from '@prisma/client'

export interface LeadsRepository {
  createOne(data: Prisma.LeadUncheckedCreateInput): Promise<Lead>
  createMany(data: Prisma.LeadCreateManyInput[]): Promise<Prisma.BatchPayload>
  findOneById(id: string): Promise<Lead | null>
  findManyByUserTeamId(id: string): Promise<Lead | null>
}
