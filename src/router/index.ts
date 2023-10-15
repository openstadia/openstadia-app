import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ServersView from '@/views/ServersView.vue'
import { authGuard } from '@auth0/auth0-vue'
import AppsView from '@/views/AppsView.vue'
import ServerSettingsView from '@/views/ServerSettingsView.vue'
import ServerCreateView from '@/views/ServerCreateView.vue'
import ServerConnectView from '@/views/ServerConnectView.vue'
import { unref } from 'vue'
import { getMe } from '@/services/usersApi'
import OnboardingView from '@/views/OnboardingView.vue'
import VerifyEmailView from '@/views/VerifyEmailView.vue'
import { auth0 } from '@/auth0'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/servers',
      name: 'servers',
      component: ServersView
    },
    {
      path: '/apps',
      name: 'apps',
      component: AppsView
    },
    {
      path: '/servers/:id/connect',
      name: 'server_connect',
      component: ServerConnectView,
      props: true
    },
    {
      path: '/servers/:id/settings',
      name: 'server_settings',
      component: ServerSettingsView,
      props: true
    },
    {
      path: '/servers/create',
      name: 'server_create',
      component: ServerCreateView
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: OnboardingView
    },
    {
      path: '/verify_email',
      name: 'verify_email',
      component: VerifyEmailView
    }
  ]
})

router.beforeEach(async (to) => {
  const isAuthGuard = await authGuard(to)
  if (!isAuthGuard) {
    return isAuthGuard
  }

  if (to.name === 'verify_email') {
    return true
  }

  const emailVerified = unref(auth0.idTokenClaims)?.email_verified
  if (!emailVerified) {
    return { name: 'verify_email' }
  }

  if (to.name === 'onboarding') {
    return true
  }

  const token = await auth0.getAccessTokenSilently()
  const me = await getMe(token)
  if (!me) {
    return { name: 'onboarding' }
  }

  return true
})

export default router
