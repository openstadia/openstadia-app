import type { ServerInvite } from '@/models/serverInvite'

export function buildInviteLink(invite: ServerInvite): string {
  const { server_id, token } = invite
  const url = new URL(`/servers/${server_id}/invite`, origin)
  url.searchParams.set('invite_token', token)
  return url.toString()
}

export function isInviteActive(invite: ServerInvite): boolean {
  if (invite.activated) {
    return false
  }

  if (Date.parse(invite.expiration_date) < Date.now()) {
    return false
  }

  return true
}
