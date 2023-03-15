import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms-use-case'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms ', async () => {
    await gymsRepository.create({
      id: 'gym-01',
      title: 'Javascript gym',
      description: 'description',
      latitude: -19.9152761,
      longitude: 43.8761895,
      phone: '31313',
    })

    await gymsRepository.create({
      id: 'gym-02',
      title: 'Typescript gym',
      description: 'description',
      latitude: -19.9152761,
      longitude: 43.8761895,
      phone: '31313',
    })

    const { gyms } = await sut.execute({
      query: 'Typescript gym',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ id: 'gym-02' })])
  })

  it('should be able to fetch paginated gym searchs', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        id: `gym-0${i}`,
        title: `Typescript gym ${i}`,
        description: 'description',
        latitude: -19.9152761,
        longitude: 43.8761895,
        phone: '31313',
      })
    }

    const { gyms } = await sut.execute({
      page: 2,
      query: 'Typescript',
    })

    expect(gyms).toHaveLength(2) // valida a ultima página com 2 checkins restantes
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Typescript gym 21' }),
      expect.objectContaining({ title: 'Typescript gym 22' }),
    ])
  })
})
