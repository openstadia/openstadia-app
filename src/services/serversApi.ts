import type { ServerToken } from '@/models/server'

const BASE_URL = import.meta.env.VITE_API_SERVER_URL

export async function getServers(token: string) {
  const response = await fetch(`${BASE_URL}/servers/`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return await response.json()
}

export async function getServer(token: string, serverId: number) {
  const response = await fetch(`${BASE_URL}/servers/${serverId}`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return await response.json()
}

export async function isServerOnline(token: string, serverId: number) {
  const response = await fetch(`${BASE_URL}/servers/${serverId}/online`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return await response.json()
}

export async function createServer(token: string, server: ServerCreate) {
  const response = await fetch(`${BASE_URL}/servers`, {
    method: 'POST',
    body: JSON.stringify(server),
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}

export async function deleteServer(token: string, serverId: number) {
  const response = await fetch(`${BASE_URL}/servers/${serverId}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return await response.json()
}

export async function regenerateServerToken(token: string, serverId: number): Promise<ServerToken> {
  const response = await fetch(`${BASE_URL}/servers/${serverId}/token`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return await response.json()
}
