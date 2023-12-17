<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import IconHome from '@/components/icons/IconHome.vue'
import IconProfile from '@/components/icons/IconProfile.vue'
import IconApp from '@/components/icons/IconApp.vue'
import IconServer from '@/components/icons/IconServer.vue'
import IconCode from '@/components/icons/IconCode.vue'
import IconStorage from "@/components/icons/IconStorage.vue";
import {ref} from "vue";
import {useAuth0} from "@auth0/auth0-vue";
import {useStorageDataStore} from "@/stores/storage_data";

const { getAccessTokenSilently } = useAuth0()
const token = ref('')
const storageDataStore = useStorageDataStore()

const storageTabDisplayed = ref(true)

interface MenuItem {
  name: string
  link: string
  icon?: any
  displayed: boolean
}

const items: MenuItem[] = [
  {
    name: 'Home',
    link: '/',
    icon: IconHome,
    displayed: true
  },
  {
    name: 'Profile',
    link: '/profile',
    icon: IconProfile,
    displayed: true
  },
  {
    name: 'Apps',
    link: '/apps',
    icon: IconApp,
    displayed: true
  },
  {
    name: 'Servers',
    link: '/servers',
    icon: IconServer,
    displayed: true
  },
  {
    name: 'Developer',
    link: '/developer',
    icon: IconCode,
    displayed: true
  },
  {
    name: 'Storage',
    link: '/storage',
    icon: IconStorage,
    displayed: storageTabDisplayed.value
  }
]

</script>

<template>
  <aside
    id="logo-sidebar"
    aria-label="Sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li v-for="item of items" :key="item.name">
<!--          <div v-if="item.displayed.valueOf()">-->
            <RouterLink
              :to="item.link"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <component
                :is="item.icon"
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              ></component>
              <span class="ml-3">{{ item.name }}</span>
            </RouterLink>
<!--          </div>-->
        </li>
      </ul>
    </div>
  </aside>
</template>
