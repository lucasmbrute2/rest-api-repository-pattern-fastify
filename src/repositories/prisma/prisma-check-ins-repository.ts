import { prisma } from '@/lib/prisma'
import { Prisma, CheckIn } from '@prisma/client'
import dayjs from 'dayjs'
import { CheckInsRepository } from '../check-ins-repository'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })
    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkin = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return checkin
  }

  async findManyByUserId(id: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: id,
      },
      skip: 20, // quantos pegar
      take: (page - 1) * 20, // quantos pular por pagina,
    })

    return checkIns
  }

  async countByUserId(id: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: id,
      },
    })

    return count
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })
    return checkIn
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      data,
      where: {
        id: data.id,
      },
    })

    return checkIn
  }
}
