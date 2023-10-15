const BASE_URL = import.meta.env.VITE_API_SERVER_URL

export async function getServersApps(token: string, serverId: number): Promise<App[]> {
  const response = await fetch(`${BASE_URL}/servers/${serverId}/apps`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return await response.json()
}

export async function getServersAppsSync(token: string, serverId: number): Promise<App[]> {
  const response = await fetch(`${BASE_URL}/servers/${serverId}/apps/sync`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })

  if (!response.ok) {
    return []
  }

  return await response.json()
}
