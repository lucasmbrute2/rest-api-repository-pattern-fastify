import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from './register-use-case'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = registerBodySchema.parse(req.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const user = await new RegisterUseCase(prismaUsersRepository).execute({
      email,
      name,
      password,
    })
    return reply.status(201).send({
      user,
    })
  } catch (error: any) {
    return reply.status(409).send(error?.message)
  }
}
