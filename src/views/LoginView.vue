<!-- src/views/Login.vue -->
<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <LoginForm />
  </div>
</template>

<script setup>
import LoginForm from '../components/Section/SectionLogin.vue'
import { onMounted } from 'vue'

import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  authStore.logout()
})

</script>
