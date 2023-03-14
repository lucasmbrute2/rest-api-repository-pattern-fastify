import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { it, describe, expect, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import {} from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(user).toHaveProperty('id')
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', () => {
    expect(async () => {
      await sut.execute({
        email: 'johndoe@gmail.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6),
    })

    expect(async () => {
      await sut.execute({
        email: 'johndoe@gmail.com',
        password: '123123',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
