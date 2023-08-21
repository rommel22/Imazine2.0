<template>
    <div class="row mx-0 article-list-item overflow-hidden mb-2">
        <NuxtLink :to="`/articles/${article.id}`" class="d-flex col justify-content-between py-1">
            <div>
                <div class="fw-bold">
                    {{ article.title }}
                </div>
                <div>
                    {{ article.creator.name }}
                </div>
            </div>
            <div class="my-auto">
                {{ createdAt }}
            </div>
        </NuxtLink>
        <div class="action-bar col-auto px-2">
            <NuxtLink :to="`/creator/articles/edit/${article.id}`" class="bi-pencil-fill text-white"></NuxtLink>
            <span class="bi-trash-fill text-white" data-bs-toggle="modal" :data-bs-target="`#exampleModal${article.id}`"></span>
        </div>
    </div>

    <div class="modal fade" :id="`exampleModal${article.id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Konfirmasi</h5>
                </div>
                <div class="modal-body">
                    Apakah benar ingin menghapus artikel {{ article.title }}?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tidak</button>
                    <div data-bs-dismiss="modal">
                        <button type="button" @click="deleteArticle(article.id)" class="btn btn-primary text-white">
                            Ya
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const auth = useAuth()
const { apiKey } = storeToRefs(auth)

const { article } = defineProps(['article'])
const createdAt = new Date(article.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

async function deleteArticle(articleId) {

    const res = await $fetch(`/articles/${articleId}`, 
    {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${apiKey.value}`
        },
        baseURL: 'https://21337.live.reon.my.id/'
    })
    refreshNuxtData()
}
</script>

<style lang="scss" scoped>
.article-list-item {
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.15);
    border-radius: 8px;

    .action-bar {
        background-color: #FED555;
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
    }
}
</style>