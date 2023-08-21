<template>
  <div v-if="isLoggedIn" class="row align-items-start gx-4">
    <div class="col">
      <div class="content-container p-5">
        <h1 class="pb-4">
            Berita Terbaru
        </h1>
        <ArticleListCard :article-item="article" v-for="article in articles.articles" :key="article.id" />
        <div class="mt-2 d-flex justify-content-between">
          <div v-show="page > 1">
            <button @click="page--" class="btn btn-primary rounded-5 text-white bi-chevron-left mx-2"></button>
          </div>
          <div class="my-auto">
            halaman {{ page }} dari {{ articles.pageCount }}
          </div>
          <div v-show="page < articles.pageCount">
            <button @click="page++" class="btn btn-primary rounded-5 text-white bi-chevron-right mx-2"></button>
          </div>
        </div>
      </div>
    </div>
    <HomePageCategorySidebar :categories="categories"/>
  </div>
  <!-- using v-else will cause the category sidebar above to disappear (somehow) -->
  <div v-if="!isLoggedIn">
    <div class="content-container p-5">
      <h1 style="text-align: center;">
          Silakan masuk untuk melihat konten
      </h1>
    </div>
  </div>
</template>

<script setup>
const auth = useAuth()
const { isLoggedIn, apiKey } = storeToRefs(auth)

const page = ref(0)
watch(page, () => {
  window.scrollTo(0, 0)
})

const { data: articles } = await useAsyncData(
  () => $fetch('/articles', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey.value}`
    },
    query: {
      page: page.value
    },
    baseURL: 'https://21337.live.reon.my.id/',
  }),
  {
    watch: [page, apiKey],
    default: () => {
      return {
        articles: [],
        pageCount: 0
      }
    }
  },
)

page.value = 1

const { data: categories } = await useAsyncData(
  'categories',
  () => $fetch('/categories', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey.value}`
      },
      baseURL: 'https://21337.live.reon.my.id/'
    }),
    {
      watch: apiKey
    }
)

</script>

<style lang="scss" scoped>
.category-card {
  width: 200px;
}
</style>