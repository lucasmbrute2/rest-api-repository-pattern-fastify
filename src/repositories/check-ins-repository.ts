import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  // unchecked serve para pegar o ID de relações já criadas
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(id: string, page: number): Promise<CheckIn[]>
  countByUserId(id: string): Promise<number>
  findById(id: string): Promise<CheckIn | null>
  save(checkIn: CheckIn): Promise<CheckIn>
}
