<template>
    <div class="content-container p-5">
        <div class="mx-auto mb-4 rectangle-wrapper">
            <img class="rectangle" :src="`${article.cover_image_link}`">
        </div>
        <h1 class="text-center mb-3">
            {{ article.title }}
        </h1>
        <div class="mb-5 text-center">
            <div class="d-inline-flex">
                <NuxtLink :to="`/category/${article.category.id}`" class="category-label text-primary">
                    {{ article.category.name }}
                </NuxtLink>
                <div class="vr mx-2"></div>
                <span class="text-start">
                    {{ createdAt }} oleh 
                    <span class="fw-bold">{{ article.creator.name }}</span>
                </span>
            </div>
        </div>
        <article v-html="convertedContent">
        </article>
    </div>
</template>

<script setup>
const { id } = useRoute().params

import MarkdownIt from 'markdown-it';
const md = new MarkdownIt;

const { convertDatetime } = useDatetimeConverter();

const auth = useAuth()
const { user, apiKey } = storeToRefs(auth)

const {data: article} = await useFetch(`/articles/${id}`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${apiKey.value}`
    },
    baseURL: 'https://21337.live.reon.my.id/'
})

const convertedContent = md.render(article.value.markdown_content)
const createdAt = convertDatetime(article.value.created_at);
</script>

<style lang="scss" scoped>
.rectangle-wrapper {
    box-sizing: border-box;
    max-width: 85%;
    .rectangle{
        width: 100%;
        border-radius: 16px;
    }
}
</style>