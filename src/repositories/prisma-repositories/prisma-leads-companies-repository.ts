import type { Prisma } from '@prisma/client'

import { prisma } from '@/config/prisma'

import type { LeadsCompaniesRepository } from '../leads-companies-repository'

export class PrismaLeadsCompaniesRepository
  implements LeadsCompaniesRepository
{
  async createOne(data: Prisma.LeadCompanyUncheckedCreateInput) {
    const leadCompany = await prisma.leadCompany.create({
      data,
    })
    return leadCompany
  }

  async createMany(data: Prisma.LeadCompanyUncheckedCreateInput[]) {
    const count = await prisma.leadCompany.createMany({
      data,
      skipDuplicates: true,
    })
    return count
  }

  async findOneById(id: string) {
    const leadCompany = await prisma.leadCompany.findUnique({
      where: {
        id,
      },
    })
    return leadCompany
  }

  async findOneByName(name: string) {
    const leadCompany = await prisma.leadCompany.findUnique({
      where: {
        name,
      },
    })
    return leadCompany
  }

  async findManyByNames(names: string[]) {
    const leadsCompanies = await prisma.leadCompany.findMany({
      where: {
        name: {
          in: names,
        },
      },
    })
    return leadsCompanies
  }
}
