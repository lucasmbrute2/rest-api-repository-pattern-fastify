import { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { randomUUID } from 'node:crypto'
import { CheckInsRepository } from '../check-ins-repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date') // pega o dia com a hora inicial
    const endOfTheDay = dayjs(date).endOf('date') // pega o dia com a hora final

    const checkinOnSameDate = this.items.find((ck) => {
      const checkInDate = dayjs(ck.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay) // valida se está no intervalo de horas

      return ck.user_id === userId && isOnSameDate
    })

    if (!checkinOnSameDate) return null
    return checkinOnSameDate
  }

  async countByUserId(id: string): Promise<number> {
    return this.items.filter((item) => item.user_id === id).length
  }

  async findManyByUserId(id: string, page: number): Promise<CheckIn[]> {
    return this.items
      .filter((item) => item.user_id === id)
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      gymId: data.gymId,
      user_id: data.user_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }

    this.items.push(checkIn)

    return checkIn
  }
}
