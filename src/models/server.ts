interface Server {
  id: number
  name: string
  token: string
  owner_id: number
  isOnline: boolean
}

interface ServerCreate {
  name: string
}
