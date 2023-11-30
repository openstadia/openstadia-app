import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ServersView from '@/views/ServersView.vue'
import { authGuard } from '@auth0/auth0-vue'
import AppsView from '@/views/AppsView.vue'
import ServerSettingsView from '@/views/ServerSettingsView.vue'
import ServerCreateView from '@/views/ServerCreateView.vue'
import { unref } from 'vue'
import OnboardingView from '@/views/OnboardingView.vue'
import VerifyEmailView from '@/views/VerifyEmailView.vue'
import { auth0 } from '@/auth0'
import { useUserStore } from '@/stores/user'
import DeveloperView from '@/views/DeveloperView.vue'

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
      component: () => import('@/views/ServerConnectView.vue'),
      props: true
    },
    {
      path: '/servers/:id/invite',
      name: 'server_invite',
      component: () => import('@/views/ServerInviteView.vue'),
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
      path: '/verify-email',
      name: 'verify_email',
      component: VerifyEmailView
    },
    {
      path: '/developer',
      name: 'developer',
      component: DeveloperView
    }
  ]
})

router.beforeEach(async (to) => {
  const isAuthGuard = await authGuard(to)
  if (!isAuthGuard) {
    return isAuthGuard
  }

  if (to.name === 'developer') {
    return true
  }

  const emailVerified = unref(auth0.idTokenClaims)?.email_verified
  if (to.name === 'verify_email') {
    if (emailVerified) {
      return { name: 'home' }
    } else {
      return true
    }
  } else if (!emailVerified) {
    return { name: 'verify_email' }
  }

  const userStore = useUserStore()
  await userStore.fetchUser()
  const user = userStore.user
  if (to.name === 'onboarding') {
    if (user) {
      return { name: 'home' }
    } else {
      return true
    }
  } else if (!user) {
    return { name: 'onboarding' }
  }

  return true
})

export default router
