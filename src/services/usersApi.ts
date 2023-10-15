import type { CreateUser, User } from '@/models/user'

const BASE_URL = import.meta.env.VITE_API_SERVER_URL

export async function getMe(token: string): Promise<User | null> {
  const response = await fetch(`${BASE_URL}/users/me`, {
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
  const response = await fetch(`${BASE_URL}/users`, {
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
