import { makeGetUserProfile } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(req: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfile()
  const {
    user: { password_hash, ...rest },
  } = await getUserProfile.execute({
    userId: req.user.sub,
  })

  return reply.status(200).send({ user: rest })
}
