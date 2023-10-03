import type { RouteLocation } from 'vue-router'
import { auth0 } from '@auth0/auth0-vue'

export async function userGuard(to: RouteLocation) {
  await authGuard(to)

  useAuth0()

  return
}
