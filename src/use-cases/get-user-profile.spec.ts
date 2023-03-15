import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, it, expect } from 'vitest'
import { ResourceNotFound } from './errors/resource-not-found-error'
import { GetUserProfileUseCase } from './get-user-profile'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get user', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get an user profile', async () => {
    const createdUser = await usersRepository.create({
      email: 'johndoe@gmail.com',
      name: 'john doe',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user).toHaveProperty('id')
    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual(expect.any(String))
  })

  it('should not able to get user profile with wrong ID', async () => {
    expect(async () => {
      await sut.execute({
        userId: 'non-existent-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
