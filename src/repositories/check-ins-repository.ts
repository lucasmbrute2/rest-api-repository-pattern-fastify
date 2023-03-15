import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  // unchecked serve para pegar o ID de relações já criadas
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}