import { getBaseUrl } from '@/apis/baseUrl'
import type { ServerAccess } from '@/models/serverAccess'

export async function getServerAccesses(token: string, serverId: number): Promise<ServerAccess[]> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/servers/${serverId}/accesses`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return await response.json()
}

export async function deleteServerAccess(
  token: string,
  userId: number,
  serverId: number
): Promise<ServerAccess> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/servers/${serverId}/accesses/users/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return await response.json()
}
