<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const { logout, user } = useAuth0()

const onLogout = () => {
  logout({
    logoutParams: {
      returnTo: location.origin
    }
  })
}
</script>

<template>
  <nav
    class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button
            aria-controls="logo-sidebar"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            type="button"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              aria-hidden="true"
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </button>
          <RouterLink class="flex ml-2 md:mr-24" to="/">
            <img alt="OpenStadia Logo" class="h-8 mr-3" src="@/assets/openstadia.svg" />
            <span
              class="font-title self-center text-xl sm:text-2xl whitespace-nowrap dark:text-white"
              >OpenStadia</span
            >
          </RouterLink>
        </div>
        <div class="flex items-center">
          <div class="flex items-center ml-3">
            <div>
              <button
                aria-expanded="false"
                class="w-8 h-8 flex overflow-hidden text-sm bg-gray-500 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                data-dropdown-toggle="dropdown-user"
                type="button"
              >
                <span class="sr-only">Open user menu</span>
                <img v-if="user?.picture" :src="user.picture" alt="User photo" />
              </button>
            </div>
            <div
              id="dropdown-user"
              class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
            >
              <div class="px-4 py-3" role="none">
                <p class="text-sm text-gray-900 dark:text-white" role="none">{{ user?.name }}</p>
                <p
                  class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                  role="none"
                >
                  {{ user?.email }}
                </p>
              </div>
              <ul class="py-1" role="none">
                <li>
                  <a
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    href="#"
                    role="menuitem"
                    >Settings</a
                  >
                </li>
                <li>
                  <a
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    href="#"
                    role="menuitem"
                    @click="onLogout"
                    >Sign out</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
