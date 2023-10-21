import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/models/user'
import { auth0 } from '@/auth0'
import { getMe } from '@/services/usersApi'

export const useUserStore = defineStore('user', () => {
  const userState = ref<User | null>(null)

  const fetchUser = async () => {
    if (userState.value) {
      return
    }

    const token = await auth0.getAccessTokenSilently()
    userState.value = await getMe(token)
  }

  const setUser = (user: User | null) => {
    userState.value = user
  }

  watch(auth0.isAuthenticated, async (value) => {
    if (value) {
      await fetchUser()
    } else {
      userState.value = null
    }
  })

  return { user: userState, fetchUser, setUser }
})
