import { getBaseUrl } from '@/apis/baseUrl'
import type { App } from '@/models/app'

export async function getServersApps(token: string, serverId: number): Promise<App[]> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/servers/${serverId}/apps`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return await response.json()
}

export async function getServersAppsSync(token: string, serverId: number): Promise<App[]> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/servers/${serverId}/apps/sync`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })

  if (!response.ok) {
    return []
  }

  return await response.json()
}
