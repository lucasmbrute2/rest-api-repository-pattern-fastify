import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym-use-case'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register use case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  it('should hash user password upon registration', async () => {
    const { gym } = await sut.execute({
      title: 'gym',
      description: 'description',
      latitude: -19.9152761,
      longitude: 43.8761895,
      phone: '31313',
    })

    expect(gym).toHaveProperty('id')
    expect(gym.id).toEqual(expect.any(String))
  })
})
