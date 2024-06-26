<template>
    <div class=" p-4 flex gap-4 z-50 px-14 max-sm:text-xs">
        <button @click="navigateTo('/add-category')"
            class="px-4 py-2 bg-[#B3D4FF99] text-blue-600 rounded hover:bg-gray-100">
            Add Category
        </button>
        <button @click="navigateTo('/add-product')"
            class="px-4 py-2 bg-[#B3D4FF99] text-blue-600 rounded hover:bg-gray-100">
            Add Product
        </button>
        <button @click="navigateTo('/cart')" class="px-4 py-2 bg-[#0052CC] text-white rounded hover:bg-blue-500">
            Cart
        </button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (route) => {
    router.push(route)
}
</script>