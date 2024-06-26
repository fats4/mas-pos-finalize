<!-- src/components/LoginForm.vue -->
<template>
    <div class="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 class="text-2xl font-bold text-center">Login</h2>
        <form @submit.prevent="login" class="space-y-6">
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
                <input v-model="email" id="email" type="text" required
                    class="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
                <input v-model="password" id="password" type="password" required
                    class="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
                <button type="submit"
                    class="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    :disabled="loading">
                    <span v-if="loading">Loading...</span>
                    <span v-else>Login</span>
                </button>
            </div>
        </form>
        <p v-if="error" class="mt-4 text-sm text-red-600">{{ error }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useProductStore } from '../../stores/product'
import { useCatgStore } from '../../stores/category'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const productStore = useProductStore()
const catgStore = useCatgStore()
const router = useRouter()

const login = async () => {
    await authStore.login(email.value, password.value)
    if (!authStore.error) {
        await productStore.fetchProducts()
        await catgStore.fetchCategories()
        router.push({ name: 'home' })
    }
}

const { error, loading } = authStore
</script>