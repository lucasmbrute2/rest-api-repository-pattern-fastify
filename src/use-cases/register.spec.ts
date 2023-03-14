import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { compare } from 'bcryptjs'
import { it, describe, expect } from 'vitest'
import { RegisterUseCase } from './register-use-case'

describe('Register use case', () => {
  it('should hash user password upon registration', async () => {
    const prisma = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prisma)

    const { user } = await registerUseCase.execute({
      email: 'test@gmail.com',
      name: 'Lucas',
      password: 'Adkasd#131',
    })

    const isPasswordCorrectlyHashed = await compare(
      'Adkasd#131',
      user.password_hash,
    )
    console.log(user)
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
