import {getBaseUrl} from "@/services/baseUrl";

export async function sendOffer(token: string, serverId: number, offer: Offer): Promise<Offer> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/servers/${serverId}/offer`, {
    method: 'POST',
    body: JSON.stringify(offer),
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}
