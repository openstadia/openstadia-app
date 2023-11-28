<script lang="ts" setup>
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheSider from '@/components/TheSider.vue'
import { onMounted } from 'vue'
import { initModals } from 'flowbite'

onMounted(() => {
  initModals()
})
</script>

<template>
  <div class="h-screen bg-white flex flex-col">
    <TheHeader></TheHeader>

    <TheSider></TheSider>

    <div class="p-4 sm:ml-64">
      <div class="p-4 mt-14">
        <div class="mr-20">
          <RouterView />
        </div>

        <TheFooter></TheFooter>
      </div>
    </div>
  </div>
</template>
