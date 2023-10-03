const BASE_URL = 'http://localhost:8000'

export async function getServersApps(token: string, serverId: number): Promise<App[]> {
  const response = await fetch(`${BASE_URL}/servers/${serverId}/apps`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return await response.json()
}
