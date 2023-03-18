import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate-controller'
import { profile } from './profile-controller'
import { register } from './register-controller'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  // pensar nas rotas como entidades
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  //* Protected routes*/
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
