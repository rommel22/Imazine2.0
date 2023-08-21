<template>
    <NuxtLink class="article-list-item p-4 m-0 row align-items-center gx-5" :to="`/articles/${articleItem.id}`">
        <img class="rectangle col-auto p-0" :src="`${articleItem.cover_image_link}`">
        <div class="col pe-0">
            <div class="mb-1 d-flex">
                <span class="category-label text-primary">{{ articleItem.category.name }}</span>
                <div class="vr mx-2"></div>
                <span>{{ createdAt }}</span>
            </div>
            <h2 class="row-auto">
                {{ articleItem.title }}
            </h2>
        </div>
    </NuxtLink>
</template>

<script setup>
    const { articleItem } = defineProps(['articleItem'])
    const { convertDatetime } = useDatetimeConverter();
    const createdAt = convertDatetime(articleItem.created_at);
</script>

<style lang="scss" scoped>
.article-list-item {
    border-radius: 24px;

    .rectangle{
        width: 212px;
        height: 142px;
        object-fit: object-fit;
        border-radius: 16px;
    }

    &:hover {
        background-color: #F5F5F5;
    }
}
</style>