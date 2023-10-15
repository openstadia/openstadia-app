export interface User {
  id: number
  is_active: boolean
  username: string
  email: string
}

export interface CreateUser {
  username: string
}
