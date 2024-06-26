<template>
    <div class=" p-4 flex px-14 max-sm:text-xs">
        <h2 class="text-lg font-bold mr-4">Category</h2>
        <ul class="flex flex-wrap gap-3 items-center">
            <li v-for="category in filteredCategories" :key="category.id">
                <button @click="filterByCategory(category.id)" class="text-blue-500 hover:underline">
                    {{ category.name }}
                </button>
            </li>
            <li>
                <button @click="filterByCategory(null)" class="text-blue-500 hover:underline">All</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useCatgStore } from '../../stores/category'


const categStore = useCatgStore()

onMounted(async () => {
    await categStore.fetchCategories()
})

const filterByCategory = (categoryId) => {
    categStore.setSelectedCategory(categoryId)
}

const filteredCategories = computed(() => {
    return categStore.categories.filter(category => category.name === 'Makanan' || category.name === 'Minuman' || category.name === 'Jajanan')
})
</script>