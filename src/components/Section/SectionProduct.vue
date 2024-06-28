<template>
    <div class="w-full mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div v-for="(product, index) in filteredProducts" :key="index"
            class="bg-white shadow-md border border-blue-500 rounded-lg p-4">
            <img :src="product.picture_url" alt="Product Image" class="w-full h-40 object-cover mb-4">
            <div class="flex flex-row justify-between items-center">
                <h2 class=" text-md font-bold">{{ product.name }}</h2>
                <button @click="deleteProduct(product.id, index)"
                    class="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-1 rounded">Delete</button>
            </div>
            <p class="text-gray-500 mb-8">{{ formatRupiah(product.price) }}</p>
            <div class="flex justify-center items-center">
                <button @click="addToCart(product)"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded">+ Add to
                    Cart</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'

import { useProductStore } from '../../stores/product'
import { useCatgStore } from '../../stores/category'
import { formatRupiah } from '../../utils/formatRp'
import { useAuthStore } from '../../stores/auth'
import axios from 'axios'


const productStore = useProductStore()
const categStore = useCatgStore()

onMounted(async () => {
    await productStore.fetchProducts()
})

const addToCart = (product) => {
    productStore.addToCart(product)
}

const deleteProduct = async (id, index) => {
    if (confirm("Apakah Anda ingin menghapus produk ini?")) {
        try {
            const authStore = useAuthStore()
            const token = authStore.token
            if (token) {
                await axios.delete(`https://mas-pos.appmedia.id/api/v1/product/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                productStore.products.splice(index, 1)
                alert("Product Telah Berhasil di hapus!")
                await productStore.fetchProducts()
            } else {
                alert('No token found. Please login first.')
            }
        } catch (error) {
            console.error('Failed to delete product', error)
            alert("Failed to delete product")
        }
    }
}


const filteredProducts = computed(() => {
    if (categStore.selectedCategory === null) {
        return productStore.products
    } else {
        return productStore.products.filter(product => product.category_id === categStore.selectedCategory)
    }
})
</script>
