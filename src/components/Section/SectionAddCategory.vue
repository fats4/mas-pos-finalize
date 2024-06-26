<template>
    <div>
        <div v-if="showSuccess"
            class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md z-[60]">
            Add category successfully
        </div>
        <div v-if="showError"
            class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-md z-[60]">
            Error adding category
        </div>
        <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 class="text-2xl font-bold mb-4 text-center border-b border-gray-300 pb-2">Add Category</h2>
                <form @submit.prevent="handleSubmit">
                    <div class="mb-4">
                        <label for="categoryName" class="block text-sm font-medium text-gray-700">Category Name</label>
                        <input type="text" id="categoryName" v-model="categoryName"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div class="flex justify-center space-x-4">
                        <button type="button" @click="handleCancel"
                            class="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">Cancel</button>
                        <button type="submit"
                            class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useCatgStore } from '../../stores/category'


const router = useRouter()
const categoryStore = useCatgStore()

const categoryName = ref('')
const showSuccess = ref(false)
const showError = ref(false)


onMounted(async () => {
    await categoryStore.fetchCategories()
})

const handleSubmit = async () => {
    if (!categoryName.value.trim()) {
        showError.value = true
        setTimeout(() => {
            showError.value = false
        }, 3000)
        return
    }

    try {
        await categoryStore.addCategory(categoryName.value)
        showSuccess.value = true
        setTimeout(() => {
            showSuccess.value = false
        }, 3000)
        await categoryStore.fetchCategories()
    } catch (err) {
        showError.value = true
        setTimeout(() => {
            showError.value = false
        }, 3000)
    }
}

const handleCancel = () => {
    router.push('/home') // Redirect ke halaman utama jika batal
}
</script>
