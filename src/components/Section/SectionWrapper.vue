<template>
    <div class="w-full bg-white fixed h-32 px-14 mt-[-10px]">
        <div class="fixed px-14 h-32 border-b border-gray-300 left-14 right-14">
            <div class="fixed right-0 mt-4">
                <SectionMenubar />
            </div>
            <div class="mt-[75px] fixed left-0">
                <SectionCategory />
            </div>
        </div>
    </div>

</template>
<script setup>
import SectionCategory from './SectionCategory.vue'
import SectionMenubar from './SectionMenubar.vue'
</script>