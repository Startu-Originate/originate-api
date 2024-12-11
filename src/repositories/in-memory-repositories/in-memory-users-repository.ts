// import { randomUUID } from 'node:crypto'

// import type { Gender, Prisma, Role, User, UserStatus } from '@prisma/client'

// import type { UsersRepository } from '../users-repository'

// export class InMemoryUsersRepository implements UsersRepository {
//   public items: Map<User['id'], User> = new Map()

//   async createOne(data: Prisma.UserUncheckedCreateInput) {
//     const user: User = {
//       id: randomUUID(),
//       email: data.email,
//       passwordHash: data.passwordHash,
//       firstName: data.firstName,
//       lastName: data.lastName,
//       dateBirth: data.dateBirth ? new Date(data.dateBirth) : null,
//       gender: data.gender as Gender,
//       picture: data.picture ?? null,
//       role: data.role as Role,
//       status: data.status as UserStatus,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     }

//     this.items.set(user.id, user)

//     return user
//   }

//   async findOneById(id: string) {
//     return this.items.get(id) || null
//   }

//   async findOneByEmail(email: string) {
//     for (const user of this.items.values()) {
//       if (user.email === email) {
//         return user
//       }
//     }
//     return null
//   }
// }
