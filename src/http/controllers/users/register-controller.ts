import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = registerBodySchema.parse(req.body)

  try {
    const registerUseCase = makeRegisterUseCase()
    await registerUseCase.execute({
      email,
      name,
      password,
    })
  } catch (error: any) {
    if (error instanceof UserAlreadyExistsError)
      return reply.status(409).send(error?.message)

    throw error
  }
  return reply.status(201).send()
}
