import type { Server, ServerCreate, ServerName, ServerSettings, ServerToken } from '@/models/server'
import { getBaseUrl } from '@/apis/baseUrl'

export async function getServers(token: string) {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/servers/`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return await response.json()
}

export async function getServer(token: string, serverId: number): Promise<Server> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/servers/${serverId}`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return await response.json()
}

export async function getServerSettings(token: string, serverId: number): Promise<ServerSettings> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/servers/${serverId}/settings`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return await response.json()
}

export async function isServerOnline(token: string, serverId: number) {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/servers/${serverId}/online`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return await response.json()
}

export async function createServer(token: string, server: ServerCreate) {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/servers`, {
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
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/servers/${serverId}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return await response.json()
}

export async function regenerateServerToken(token: string, serverId: number): Promise<ServerToken> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/servers/${serverId}/token`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return await response.json()
}

export async function renameServer(
  token: string,
  serverId: number,
  serverName: ServerName
): Promise<ServerToken> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/servers/${serverId}/name`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(serverName)
  })
  return await response.json()
}
