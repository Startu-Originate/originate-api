import type { LeadCompany, Prisma } from '@prisma/client'

export interface LeadsCompaniesRepository {
  createOne(data: Prisma.LeadCompanyUncheckedCreateInput): Promise<LeadCompany>
  createMany(
    data: Prisma.LeadCompanyUncheckedCreateInput[],
  ): Promise<Prisma.BatchPayload>
  findOneById(id: string): Promise<LeadCompany | null>
  findOneByName(name: string): Promise<LeadCompany | null>
  findManyByNames(names: string[]): Promise<LeadCompany[] | null>
}
