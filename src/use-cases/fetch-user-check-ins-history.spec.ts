import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User check-in history', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch checin history ', async () => {
    await checkInsRepository.create({
      gymId: 'gym-01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gymId: 'gym-02',
      user_id: 'user-01',
    })

    const { checkins } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkins).toHaveLength(2)
    expect(checkins).toEqual([
      expect.objectContaining({ gymId: 'gym-01' }),
      expect.objectContaining({ gymId: 'gym-02' }),
    ])
  })
})
