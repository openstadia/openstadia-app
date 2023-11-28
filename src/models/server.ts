export type UserServerRole = 'owner' | 'user'

export interface Server {
  id: number
  name: string
  owner_id: number
  online: boolean
  role: UserServerRole
}

export interface ServerSettings extends Server {
  token: string
}

export interface ServerCreate {
  name: string
}

export interface ServerToken {
  token: string
}

export interface ServerName {
  name: string
}
