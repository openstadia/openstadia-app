import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getEnv, resetEnv as resetEnvInternal, setEnv as setEnvInternal } from '@/utils/env'
import type { Env } from '@/models/env'

export const useEnvStore = defineStore('hub', () => {
  const envRef = ref<Env>(getEnv())

  const setEnv = (env: Env) => {
    envRef.value = env
    setEnvInternal(env)
  }

  const resetEnv = () => {
    envRef.value = resetEnvInternal()
  }

  return { env: envRef, setEnv, resetEnv }
})
