import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime'
import { it, describe, expect, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './checking-use-case'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check in use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    vi.useFakeTimers() // seta datas fakes

    await gymsRepository.create({
      id: 'jeqjeq',
      title: 'academia',
      description: '',
      latitude: -19.9152761,
      longitude: 43.8761895,
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
      userLatitude: -19.9152761,
      userLongitude: 43.8761895,
    })

    expect(checkin).toHaveProperty('id')
    expect(checkin.user_id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'jeqjeq',
      userId: '3k1k31',
      userLatitude: -19.9152761,
      userLongitude: 43.8761895,
    })

    await expect(() =>
      sut.execute({
        gymId: 'jeqjeq',
        userId: '3k1k31',
        userLatitude: -19.9152761,
        userLongitude: 43.8761895,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check-in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'jeqjeq',
      userId: '3k1k31',
      userLatitude: -19.9152761,
      userLongitude: 43.8761895,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkin } = await sut.execute({
      gymId: 'jeqjeq',
      userId: '3k1k31',
      userLatitude: -19.9152761,
      userLongitude: 43.8761895,
    })

    expect(checkin.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    gymsRepository.items.push({
      id: '2',
      title: 'academia',
      description: '',
      latitude: new Decimal(-19.9152761),
      longitude: new Decimal(43.8761895),
      phone: '313',
    })

    await expect(() =>
      sut.execute({
        gymId: '2',
        userId: '3k1k31',
        userLatitude: -19.9589888,
        userLongitude: -43.9877632,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
