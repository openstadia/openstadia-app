import { getBaseUrl } from '@/apis/baseUrl'
import type {ServerInvite, ServerInviteDisable, ServerInviteInfo, ServerInviteToken} from '@/models/serverInvite'

export async function createServerInvite(token: string, serverId: number): Promise<ServerInvite> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/servers/${serverId}/invites`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return await response.json()
}

export async function getServerInvites(
    token: string,
    serverId: number,
): Promise<ServerInvite[]> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/servers/${serverId}/invites`, {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  })
  return await response.json()
}

export async function getServerInviteInfo(
  token: string,
  serverId: number,
  inviteToken: ServerInviteToken
): Promise<ServerInviteInfo> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/servers/${serverId}/invites/info`, {
    method: 'POST',
    body: JSON.stringify(inviteToken),
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}

export async function activateServerInvite(
  token: string,
  serverId: number,
  inviteToken: ServerInviteToken
) {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/servers/${serverId}/invites/activate`, {
    method: 'POST',
    body: JSON.stringify(inviteToken),
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  })
  return response
}

export async function disableServerInvite(
    token: string,
    serverId: number,
    inviteDisable: ServerInviteDisable
) {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/servers/${serverId}/invites/disable`, {
    method: 'POST',
    body: JSON.stringify(inviteDisable),
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  })
  return response
}
