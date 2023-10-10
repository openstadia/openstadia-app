const BASE_URL = import.meta.env.VITE_API_SERVER_URL

export async function getApps(token: string): Promise<App[]> {
  const response = await fetch(`${BASE_URL}/apps`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return await response.json()
}
