const BASE_URL = import.meta.env.VITE_API_SERVER_URL

export async function sendOffer(token: string, serverId: number, offer: Offer): Promise<Offer> {
  const response = await fetch(`${BASE_URL}/servers/${serverId}/offer`, {
    method: 'POST',
    body: JSON.stringify(offer),
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}
