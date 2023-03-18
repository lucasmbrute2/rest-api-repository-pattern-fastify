import { FastifyInstance } from 'fastify'
import request from 'supertest'

interface ICheckUserRole {
  isAdmin: boolean
}

export async function createAndAuthUser(
  app: FastifyInstance,
  isAdmin?: ICheckUserRole,
) {
  await request(app.server)
    .post('/users')
    .send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body
  return {
    token,
  }
}
