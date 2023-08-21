<template>
    <div class="category-card">
        <div class="content-container p-4">
            <h2>Kategori</h2>
            <NuxtLink :to="`/category/${category.id}`" v-for="category in categories" :key="category.id" class="category-label d-block mt-2 lh-sm">
                {{ category.name }}
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
    const { categories } = defineProps(['categories'])
</script>