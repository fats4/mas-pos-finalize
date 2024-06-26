<template>
    <nav
        class="fixed top-0 left-0 right-0 bg-blue-700 text-white flex items-center justify-between px-6 py-4 shadow-md z-50">
        <div class="flex items-center">
            <h1 @click="navigateTo('/home')" class="text-2xl font-bold cursor-pointer">MASPOS</h1>
        </div>
        <div class="relative flex items-center space-x-4">
            <div class="flex items-center space-x-2">
                <span>{{ authStore.username }}</span> <!-- Gunakan nama dari authStore -->
                <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer"
                    @click="toggleLogoutPopup">
                    <img src="../../assets/logo.jpeg" alt="User" class="w-8 h-8 rounded-full">
                </div>
            </div>
            <div v-if="showLogoutPopup" class="absolute top-12 right-0 bg-white text-black p-4 rounded shadow-md">
                <p>Are you sure you want to log out?</p>
                <div class="flex justify-end space-x-2 mt-2">
                    <button @click="logout"
                        class="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded">Yes</button>
                    <button @click="toggleLogoutPopup"
                        class="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded">No</button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const showLogoutPopup = ref(false)

const navigateTo = (route) => {
    router.push(route)
}

const toggleLogoutPopup = () => {
    showLogoutPopup.value = !showLogoutPopup.value
}

const logout = () => {
    authStore.logout()  // Gunakan method logout dari authStore
    alert('Logged out successfully')
    router.push('/') // Redirect to login page
}
</script>
