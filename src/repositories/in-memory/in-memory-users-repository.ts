import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      created_at: new Date(),
      email: data.email,
      id: 'random-id',
      name: data.name,
      password_hash: data.password_hash,
    }
    this.items.push(user)
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email)

    if (!user) return null
    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((user) => user.id === id)
    if (!user) return null
    return user
  }
}
