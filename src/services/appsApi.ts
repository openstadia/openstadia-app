import { getBaseUrl } from '@/services/baseUrl'

export async function getApps(token: string): Promise<App[]> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/apps`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return await response.json()
}
