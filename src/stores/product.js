import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import axios from 'axios'
import router from '@/router'

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [],
        cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    }),

    getters: {
        totalBill(state) {
            return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        }
    },

    actions: {
        async fetchProducts() {
            const authStore = useAuthStore()
            const token = authStore.token
            if (token) {
                this.loading = true
                this.error = null
                try {
                    const response = await axios.get('https://mas-pos.appmedia.id/api/v1/product', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    this.products = response.data.data // Asumsikan data produk berada di response.data.data
                    console.log(this.products)
                } catch (error) {
                    console.error('Failed to fetch product', error)
                    alert('Mohon login terlebih dahulu')
                    router.push('/')
                } finally {
                    this.loading = false
                }
            } else {
                this.error = 'No token found'
            }
        },

        addToCart(product) {
            const cartItem = this.cartItems.find(item => item.id === product.id)
            if (cartItem) {
                cartItem.quantity++
            } else {
                this.cartItems.push({ ...product, quantity: 1 })
            }
            this.saveCartItems()
        },

        saveCartItems() {
            localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
        },

        removeFromCart(item) {
            this.cartItems = this.cartItems.filter(i => i.id !== item.id)
            this.saveCartItems()
        },

        clearCart() {
            this.cartItems = []
            localStorage.removeItem('cartItems')
        },
    },
})
