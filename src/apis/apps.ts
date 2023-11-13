import { getBaseUrl } from '@/apis/baseUrl'
import type { App } from '@/models/app'

export async function getApps(token: string): Promise<App[]> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/apps`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return await response.json()
}
