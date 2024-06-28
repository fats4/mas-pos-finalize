<template>
    <div class="p-4 flex px-14 max-sm:text-xs">
        <h2 class="text-lg font-bold mr-4">Category</h2>
        <ul class="flex flex-wrap gap-3 items-center">
            <li v-for="category in displayedCategories" :key="category.id">
                <button @click="filterByCategory(category.id)" class="text-blue-500 hover:underline">
                    {{ category.name }}
                </button>
            </li>
            <li>
                <button @click="filterByCategory(null)" class="text-blue-500 hover:underline">All</button>
            </li>
        </ul>
        <button @click="toggleCategoryView" class="ml-auto text-blue-500 hover:underline pl-5">
            {{ showAllCategories ? 'Show Filtered' : 'Show All' }}
        </button>
    </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCatgStore } from '../../stores/category'


const categStore = useCatgStore()
const showAllCategories = ref(false)


onMounted(async () => {
    await categStore.fetchCategories()
})

const toggleCategoryView = () => {
    showAllCategories.value = !showAllCategories.value
}

const filterByCategory = (categoryId) => {
    categStore.setSelectedCategory(categoryId)
}

const filteredCategories = computed(() => {
    return categStore.categories.filter(category => category.name === 'Makanan' || category.name === 'Minuman' || category.name === 'Jajanan' || category.name === 'Dessert')
})

const displayedCategories = computed(() => {
    return showAllCategories.value ? categStore.categories : filteredCategories.value
})
</script>