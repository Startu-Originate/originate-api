import { app } from 'src/app'

interface UserInvitationJwtPayload {
  userEmail: string
  userTeamId: string
}

export async function generateInvitationJwt(
  payload: UserInvitationJwtPayload,
): Promise<string> {
  const token = app.jwt.sign(payload, { expiresIn: '1d' })
  return token
}
