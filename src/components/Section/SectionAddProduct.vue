<template>
    <div>
        <div v-if="showSuccess"
            class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md z-[60]">
            Add product successfully
        </div>
        <div v-if="showError"
            class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-md z-[60]">
            Error adding product
        </div>
        <div class="add-product mx-auto my-8 p-8 max-w-lg bg-white rounded-lg shadow-md">
            <h1 class="text-2xl font-bold mb-6 justify-center flex">Add Product</h1>
            <form @submit.prevent="submitProduct"
                class="flex flex-row justify-center max-sm:flex-col max-sm:items-center">
                <div>
                    <div class="upload-container bg-[#B3D4FF] w-36 h-36 items-center flex justify-center object-cover mx-4 mt-2 border-2 rounded-md "
                        @click="triggerFileUpload">
                        <input type="file" ref="fileInput" @change="handleFileUpload" class="file-input hidden" />
                        <div v-if="imageUrl" class="image-preview w-36 h-36 object-cover">
                            <img :src="imageUrl" alt="Uploaded Image" class="w-36 h-36 object-cover" />
                        </div>
                        <div v-else class="upload-content items-center flex justify-center flex-col">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                class="bi bi-cloud-upload" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M8 0a5.53 5.53 0 0 0-5.466 4.582C.861 4.921 0 5.92 0 7a3 3 0 0 0 3 3h1a1 1 0 0 1 1 1v2h6v-2a1 1 0 0 1 1-1h1a3 3 0 0 0 .356-5.982A5.53 5.53 0 0 0 8 0zm2.354 5.854a.5.5 0 0 0-.708-.708L8 6.293V2.5a.5.5 0 0 0-1 0v3.793L6.354 5.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2z" />
                            </svg>
                            <p>Upload Image</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="mb-4 max-sm:pt-4">
                        <label class="block mb-2 text-sm font-medium text-gray-700">Product Name</label>
                        <input v-model="productName" type="text" class="w-full px-3 py-2 border rounded"
                            placeholder="Product Name" />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-700">Price</label>
                        <input v-model="price" type="number" class="w-full px-3 py-2 border rounded"
                            placeholder="Input price" />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-700">Select Category</label>
                        <select v-model="selectedCategory" class="w-full px-3 py-2 border rounded">
                            <option value="" disabled>Select category</option>
                            <option v-for="category in filteredCategories" :key="category.id" :value="category.id">{{
                                category.name }}</option>
                        </select>
                    </div>
                    <div class="flex justify-between">
                        <button type="button" @click="cancel"
                            class="px-4 py-2 border border-blue-500 text-blue-500 rounded mr-2">Cancel</button>
                        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Confirm</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '../../stores/product'
import { useCatgStore } from '../../stores/category'
import { useRouter } from 'vue-router'

const productStore = useProductStore()
const categStore = useCatgStore()

const productName = ref('')
const price = ref('')
const selectedCategory = ref('')
const categories = ref([])
const router = useRouter()

let imageFile = null
const showSuccess = ref(false)
const showError = ref(false)

onMounted(async () => {
    await categStore.fetchCategories()
    categories.value = categStore.categories
})

const filteredCategories = computed(() => {
    return categories.value.filter(category => category.name === 'Makanan' || category.name === 'Minuman' || category.name === 'Jajanan' || category.name === 'Dessert')
})

const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        imageFile = file
        imageUrl.value = URL.createObjectURL(file)
    }
}

const fileInput = ref(null)
const imageUrl = ref('')

const triggerFileUpload = () => {
    fileInput.value.click()
}

const submitProduct = async () => {
    const productData = new FormData()
    productData.append('name', productName.value)
    productData.append('price', price.value)
    productData.append('category_id', selectedCategory.value)
    if (imageFile) {
        productData.append('image', imageFile)
    }
    try {
        await productStore.addProduct(productData)
        showSuccess.value = true
        setTimeout(() => {
            showSuccess.value = false
        }, 3000)
        cancel()
    } catch (error) {
        showError.value = true
        setTimeout(() => {
            showError.value = false
        }, 3000)
    }
}

const cancel = () => {
    productName.value = ''
    price.value = ''
    selectedCategory.value = ''
    imageUrl.value = null
    imageFile = null

    router.push({ name: 'home' })
}
</script>

<style scoped>
.add-product {
    margin: 2rem auto;
    padding: 2rem;
    max-width: 32rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>