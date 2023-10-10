<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue'

const { user } = useAuth0()
</script>

<template>
  <h2 class="mb-6 text-2xl font-bold">Profile</h2>

  <img :src="user?.picture" alt="Profile avatar" class="mb-6 w-16 h-16 rounded-full" />

  <form>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="first_name"
          >First name</label
        >
        <input
          id="first_name"
          :value="user?.given_name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          disabled
          readonly
          type="text"
        />
      </div>

      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="last_name"
          >Last name</label
        >
        <input
          id="last_name"
          :value="user?.family_name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          disabled
          readonly
          type="text"
        />
      </div>
    </div>

    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="email"
        >Email address</label
      >
      <input
        id="email"
        :value="user?.email"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        disabled
        readonly
        type="email"
      />
    </div>
  </form>
</template>
