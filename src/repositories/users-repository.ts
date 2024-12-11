import type { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  createOne(data: Prisma.UserUncheckedCreateInput): Promise<User>
  findOneById(id: string): Promise<User | null>
  findOneByEmail(email: string): Promise<User | null>
}
