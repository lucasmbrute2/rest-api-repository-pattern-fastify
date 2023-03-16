import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate-controller'
import { profile } from './controllers/profile-controller'
import { register } from './controllers/register-controller'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  // pensar nas rotas como entidades
  app.post('/sessions', authenticate)

  //* Protected routes*/
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
