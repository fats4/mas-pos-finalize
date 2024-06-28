<template>
    <div>
        <!-- Navbar Section -->
        <SectionNavbar />
        <div class="pt-20">
            <SectionWrapper />
        </div>
        <!-- Main Content -->
        <div class="pt-20 px-14"> <!-- Add padding to avoid content being hidden behind the navbar -->
            <SectionProduct />
            <div class="fixed bottom-0 right-0 flex justify-end p-4">
                <button @click="navigateTo('/payment')"
                    class="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-lg">
                    Total Bill: {{ formatRupiah(totalBill) }}
                </button>
            </div>

        </div>
    </div>

</template>

<script setup>
import { computed } from 'vue'
import SectionNavbar from '../components/Section/SectionNavbar.vue';
import SectionProduct from '../components/Section/SectionProduct.vue'
import SectionWrapper from '../components/Section/SectionWrapper.vue'
import { formatRupiah } from '../utils/formatRp'
import { useProductStore } from '../stores/product'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (route) => {
    router.push(route)
}

const productStore = useProductStore()

const totalBill = computed(() => productStore.totalBill)
</script>
