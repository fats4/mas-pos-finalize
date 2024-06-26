<template>
    <div class="section-cart-bar mt-5 px-4">
        <div class="cart-header flex justify-between px-4 py-2 font-bold bg-gray-200">
            <span class="product flex-1 text-left">Product</span>
            <span class="qty flex-1 text-center">Qty</span>
            <span class="sub-total flex-1 text-right">Sub Total</span>
        </div>
        <div v-for="(item, index) in cartItems" :key="item.id"
            class="cart-item flex items-center justify-between border-b py-4">
            <div class="flex flex-row justify-center gap-5 w-1/3">
                <div class="flex gap-4">
                    <span class="flex-1 text-left">{{ index + 1 }}.</span>
                    <div>
                        <img :src="item.picture_url" alt="Product Image"
                            class=" w-32 h-32 rounded-md object-cover flex-1" />
                    </div>
                </div>
                <div class="flex-1 text-left">
                    <p class=" font-semibold">{{ item.name }}</p>
                    <p>{{ formatRupiah(item.price) }}</p>
                </div>
            </div>

            <div class="flex items-center flex-1 justify-center w-1/3">
                <button @click="decrement(item)" class="px-2.5 py-1 bg-blue-500 text-white rounded-full">-</button>
                <span class="mx-2">{{ item.quantity }}</span>
                <button @click="increment(item)" class="px-2.5 py-1 bg-blue-500 text-white rounded-full">+</button>
            </div>
            <div class="flex flex-row w-1/3">
                <button @click="removeFromCart(item)" class="px-4 py-2 bg-red-500 text-white rounded">Remove
                    Item</button>
                <div class="flex-1 text-right mr-4">{{ formatRupiah(item.price * item.quantity) }}</div>
            </div>
        </div>
        <div class="flex justify-end font-bold mt-4">
            <span>Total</span>
            <span class="ml-4">{{ formatRupiah(totalBill) }}</span>
        </div>
        <div class="flex justify-end mt-4">
            <button @click="navigateTo('/home')"
                class="px-4 py-2 border border-blue-500 text-blue-500 rounded mr-2">Back to Home</button>
            <button @click="navigateTo('/payment')" class="px-4 py-2 bg-blue-500 text-white rounded">Pay Bill</button>
        </div>
    </div>
</template>

<script setup>
import { useProductStore } from '../../stores/product'
import { formatRupiah } from '../../utils/formatRp'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (route) => {
    router.push(route)
}

const productStore = useProductStore()

const cartItems = computed(() => productStore.cartItems)
const totalBill = computed(() => productStore.totalBill)

const increment = (item) => {
    productStore.addToCart(item)
}

const decrement = (item) => {
    const cartItem = productStore.cartItems.find(i => i.id === item.id)
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--
        productStore.saveCartItems()
    }
}

const removeFromCart = (item) => {
    productStore.removeFromCart(item)
}
</script>

<style scoped>
.section-cart-bar {
    margin-top: 20px;
    padding-left: 1rem;
    padding-right: 1rem;
}
</style>
