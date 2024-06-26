<template>
    <div class="payment-page p-8">
        <h1 class="text-2xl font-bold mb-4">Payment Details</h1>
        <div class="order-details mb-4">
            <h2 class="text-xl font-semibold">Order Summary</h2>
            <div v-for="(item, index) in cartItems" :key="index" class="order-item flex justify-between py-2">
                <span>{{ item.name }} (x{{ item.quantity }})</span>
                <span>{{ formatRupiah(item.price * item.quantity) }}</span>
            </div>
            <div class="total font-bold flex justify-between py-2 border-t mt-2">
                <span>Total</span>
                <span>{{ formatRupiah(totalBill) }}</span>
            </div>
        </div>
        <button @click="processPayment" class="bg-blue-500 text-white py-2 px-4 rounded">Pay Now</button>

        <!-- Popup Receipt -->
        <div v-if="showReceipt" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div class="bg-white p-6 rounded shadow-md">
                <h2 class="text-xl font-semibold mb-4">Receipt</h2>
                <div v-for="(item, index) in cartItems" :key="index" class="order-item flex justify-between py-2">
                    <span>{{ item.name }} (x{{ item.quantity }})</span>
                    <span>{{ formatRupiah(item.price * item.quantity) }}</span>
                </div>
                <div class="total font-bold flex justify-between py-2 border-t mt-2">
                    <span>Total</span>
                    <span>{{ formatRupiah(totalBill) }}</span>
                </div>
                <button @click="printReceipt" class="bg-blue-500 text-white py-2 px-4 rounded mt-4">Print
                    Receipt</button>
                <button @click="closeReceipt" class="bg-red-500 text-white py-2 px-4 rounded mt-4 ml-2">Close</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useProductStore } from '../../stores/product'
import { formatRupiah } from '../../utils/formatRp'

const productStore = useProductStore()
const cartItems = computed(() => productStore.cartItems)
const totalBill = computed(() => productStore.totalBill)
const showReceipt = ref(false)

const processPayment = () => {
    // Simulasi pembayaran
    alert('Pembayaran berhasil!')
    showReceipt.value = true
}

const printReceipt = () => {
    window.print()
}

const closeReceipt = () => {
    showReceipt.value = false
}
</script>

<style scoped>
.payment-page {
    max-width: 600px;
    margin: 0 auto;
}
</style>