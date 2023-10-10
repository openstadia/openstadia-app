import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ServersView from '@/views/ServersView.vue'
import { authGuard } from '@auth0/auth0-vue'
import AppsView from '@/views/AppsView.vue'
import ServerSettingsView from '@/views/ServerSettingsView.vue'
import ServerCreateView from '@/views/ServerCreateView.vue'
import ServerConnectView from '@/views/ServerConnectView.vue'

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
    }
  ]
})

router.beforeEach((to) => authGuard(to))

export default router
