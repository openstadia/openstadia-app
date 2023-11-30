import type { UserServerRole } from '@/models/server'

export interface ServerAccess {
  user_id: number
  server_id: number
  role: UserServerRole
}
