import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '../../use-cases/register-use-case'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = registerBodySchema.parse(req.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    await new RegisterUseCase(prismaUsersRepository).execute({
      email,
      name,
      password,
    })
  } catch (error: any) {
    if (error instanceof UserAlreadyExistsError)
      return reply.status(409).send(error?.message)

    return reply.status(500).send()
  }
  return reply.status(201).send()
}
