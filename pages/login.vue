<template>
    <div>
        <p>Sign-In Options:</p>
        <button @click="signIn('google')">Google</button>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    },
})

const {signIn} = useAuth()
</script>
