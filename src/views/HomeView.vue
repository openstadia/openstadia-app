<script lang="ts" setup>
import IconHeart from '@/components/icons/IconHeart.vue'
import HomeCard from '@/components/HomeCard.vue'
</script>

<template>
  <div class="flex items-center mb-6">
    <span class="text-2xl font-bold">Welcome to</span>
    <span class="ml-2 text-2xl font-title font-bold">OpenStadia</span>
    <IconHeart class="ml-2 w-6 h-6 text-openstadia"></IconHeart>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    <HomeCard
      title="Downloads"
      text="Get things done faster. Access info anywhere instantly. Upgrade productivity now with our app."
      button="Download"
    ></HomeCard>

    <HomeCard
      title="Docs"
      text="Maximize potential. Streamline workflows. Optimize efficiency. Answers await in our knowledge base."
      button="Read docs"
    ></HomeCard>
  </div>
</template>
