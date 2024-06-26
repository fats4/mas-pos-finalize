// src/stores/auth.js
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import axios from 'axios'
import router from '@/router'


export const useCatgStore = defineStore('ctg', {
    state: () => ({
        categories: [],
        selectedCategory: null
    }),
    actions: {
        async fetchCategories() {
            const authStore = useAuthStore()
            const token = authStore.token
            try {
                const response = await axios.get('https://mas-pos.appmedia.id/api/v1/category', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                this.categories = response.data.data
                console.log(this.categories)
            } catch (error) {
                console.error('Failed to fetch categories', error)
                alert('Mohon login terlebih dahulu')
                router.push('/')
            }
        },

        setSelectedCategory(categoryId) {
            this.selectedCategory = categoryId
        },

        async addCategory(categoryName) {
            const authStore = useAuthStore()
            const token = authStore.token

            try {
                const response = await axios.post('https://mas-pos.appmedia.id/api/v1/category', {
                    name: categoryName,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                this.categories.push(response.data.data) // Asumsikan data kategori berada di response.data.data
                console.log(response.data.data)
            } catch (error) {
                console.error('Failed to add categories', error)
            }
        }
    },

})
