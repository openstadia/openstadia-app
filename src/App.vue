<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="flex">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/apps">Apps</RouterLink>
        <RouterLink to="/servers">Servers</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
