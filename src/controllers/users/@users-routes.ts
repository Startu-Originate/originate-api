import type { FastifyInstance } from 'fastify'

import { generateUserInvitationTokenController } from './generate-user-invitation-controller'
import { userSignInController } from './user-sign-in-controller'

export async function appUserRoutes(app: FastifyInstance) {
  app.post('/sign-in', userSignInController)
  app.post('/sign-up', userSignInController)

  // app.get('/me', { onRequest: [verifyNextAuthJwt] }, userProfileController)
  app.get(
    '/generate-user-invitation-token',
    // { onRequest: [verifyNextAuthJwt, verifyUserRole('USER')] },
    generateUserInvitationTokenController,
  )
}
