import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface FetchNearbyGymsUcaseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsUcaseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUcaseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUcaseCaseRequest): Promise<FetchNearbyGymsUcaseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
