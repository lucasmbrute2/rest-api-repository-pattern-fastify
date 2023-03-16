import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../validate-check-in-use-case'

export function makeValidateCheckInUseCase() {
  const checkinsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(checkinsRepository)
  return useCase
}
