<template>
    <div class="row align-items-start" style="height: 90vh;">
        <div class="category-card">
            <div class="content-container p-4">
                <h2 class="me-2">Kategori</h2>
                <div v-for="category in user.has_article_edit_access" :id="category.id">
                    <span @click="currentCategoryId = category.id" replace class="category-label d-flex gx-5">
                        <div class="me-1">{{ category.name }}</div>
                    </span>
                </div>
            </div>
        </div>
        <div class="col" style="height: 100%">
            <div class="content-container p-4 overflow-y-hidden" style="height: 100%">
                <div class="d-flex justify-content-between mb-3">
                    <h2 class="my-auto">
                        Daftar Artikel Kategori {{ currentCategory.name }}
                    </h2>
                    <NuxtLink :to="`/creator/articles/new?initial-category-id=${currentCategoryId}`" class="btn btn-primary btn-sm text-white">
                        <span class="bi-plus-lg me-1"></span>Artikel</NuxtLink>
                </div>
                <input class="form-control mb-3" v-model="searchQuery" placeholder="Cari artikel...">

                <div class="overflow-y-scroll" style="height: 87%">
                    <div v-for="article in articles">
                        <ArticleListItem :article="article"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const auth = useAuth()
const { user, apiKey } = storeToRefs(auth)

const currentCategoryId = ref(user.value.has_article_edit_access[0].id);
const searchQuery = ref('');
const currentCategory = ref(user.value.has_article_edit_access.find(category => category.id == currentCategoryId.value))

watch(currentCategoryId, (newCategoryId, oldCategoryId) => {
    currentCategory.value = user.value.has_article_edit_access.find(category => category.id == newCategoryId);
    searchQuery.value = ''
});

const { data: articles } = await useAsyncData(
    'articles',
    () => $fetch(`/creators/articles/${currentCategoryId.value}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey.value}`
        },
        query: {
            search: searchQuery.value
        },
        baseURL: 'https://21337.live.reon.my.id/'
    }),
    {
        watch: [
            currentCategoryId,
            searchQuery
        ]
    }
)

</script>

<style lang="scss" scoped>
.category-card {
  width: 300px;
}
</style>