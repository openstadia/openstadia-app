const BASE_URL = 'http://localhost:8000'

export async function getOffer(token: string, serverId: number, offer: Offer): Promise<Offer> {
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
