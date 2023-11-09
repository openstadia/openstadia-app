import type { CreateUser, User } from '@/models/user'
import { getBaseUrl } from '@/services/baseUrl'

export async function getMe(token: string): Promise<User | null> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/users/me`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })

  if (!response.ok) {
    return null
  }

  return await response.json()
}

export async function createUser(token: string, user: CreateUser): Promise<User | null> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    return null
  }

  return await response.json()
}
