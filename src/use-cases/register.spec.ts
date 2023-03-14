import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { it, describe, expect, beforeEach } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register-use-case'

let usersRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await registerUseCase.execute({
      email: 'test@gmail.com',
      name: 'Lucas',
      password: 'Adkasd#131',
    })

    const isPasswordCorrectlyHashed = await compare(
      'Adkasd#131',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await registerUseCase.execute({
      email,
      name: 'Lucas',
      password: 'Adkasd#131',
    })

    expect(async () => {
      await registerUseCase.execute({
        email,
        name: 'Lucas',
        password: 'Adkasd#131',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register an user', async () => {
    const email = 'johndoe@example.com'

    const { user } = await registerUseCase.execute({
      email,
      name: 'Lucas',
      password: 'Adkasd#131',
    })

    expect(user).toHaveProperty('id')
    expect(user.id).toEqual(expect.any(String))
  })
})
