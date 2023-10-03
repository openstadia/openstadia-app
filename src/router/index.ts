import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import ServersView from '@/views/ServersView.vue'
import ServerView from '@/views/ServerView.vue'
import { authGuard } from '@auth0/auth0-vue'
import AppsView from '@/views/AppsView.vue'
import ServerSettingsView from '@/views/ServerSettingsView.vue'
import ServerCreateView from '@/views/ServerCreateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/servers',
      name: 'servers',
      component: ServersView,
      beforeEnter: authGuard
    },
    {
      path: '/apps',
      name: 'apps',
      component: AppsView,
      beforeEnter: authGuard
    },
    {
      path: '/servers/:id',
      name: 'server',
      component: ServerView,
      props: true,
      beforeEnter: authGuard
    },
    {
      path: '/servers/:id/settings',
      name: 'server_settings',
      component: ServerSettingsView,
      props: true,
      beforeEnter: authGuard
    },
    {
      path: '/servers/create',
      name: 'server_create',
      component: ServerCreateView,
      beforeEnter: authGuard
    }
  ]
})

export default router
