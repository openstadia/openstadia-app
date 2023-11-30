export interface ServerInvite {
  id: number
  token: string
  activated: boolean

  created_at: string
  expiration_date: string
  activated_at?: string

  created_by: number
  server_id: number
  activated_by?: number
}

export interface ServerInviteInfo extends ServerInvite {
  can_activate: boolean
}

export interface ServerInviteToken {
  token: string
}

export interface ServerInviteDisable {
  id: number
}
