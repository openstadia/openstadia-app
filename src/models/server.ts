export interface Server {
  id: number
  name: string
  token: string
  owner_id: number
  isOnline: boolean
}

export interface ServerCreate {
  name: string
}

export interface ServerToken {
  token: string
}
