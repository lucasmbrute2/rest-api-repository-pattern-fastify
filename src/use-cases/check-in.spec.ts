import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime'
import { it, describe, expect, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './checking-use-case'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check in use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    vi.useFakeTimers() // seta datas fakes
    gymsRepository.items.push({
      id: 'jeqjeq',
      title: 'academia',
      description: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      phone: '313',
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const { checkin } = await sut.execute({
      gymId: 'jeqjeq',
      userId: '3k1k31',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkin).toHaveProperty('id')
    expect(checkin.user_id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'jeqjeq',
      userId: '3k1k31',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      sut.execute({
        gymId: 'jeqjeq',
        userId: '3k1k31',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check-in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'jeqjeq',
      userId: '3k1k31',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkin } = await sut.execute({
      gymId: 'jeqjeq',
      userId: '3k1k31',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkin.id).toEqual(expect.any(String))
  })
})
