const BASE_URL = 'http://localhost:8000'

export async function getApps(token: string): Promise<App[]> {
  const response = await fetch(`${BASE_URL}/apps`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return await response.json()
}
