import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  })

  const { description, title, latitude, longitude, phone } =
    createGymBodySchema.parse(req.body)

  const registerUseCase = makeCreateGymUseCase()
  await registerUseCase.execute({
    description,
    title,
    latitude,
    longitude,
    phone,
  })

  return reply.status(201).send()
}
