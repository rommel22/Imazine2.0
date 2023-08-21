<template>
    <div class="row align-items-start d-flex gap-4">
        <div class="col content-container px-0 py-4">
            <div class="d-flex justify-content-between mb-3 ps-4">
                <h2 class="my-auto">
                    Artikel Baru
                </h2>
                <button class="btn btn-primary btn-sm text-white" @click="hiddenPreview = !hiddenPreview" style="border-radius: 150px 0 0 150px;">
                    Preview
                    <span v-if="hiddenPreview" class="ms-1 bi-chevron-left"></span>
                    <span v-else class="ms-1 bi-chevron-right"></span>
                </button>
            </div>
            <div class="px-4 d-grid gap-3">
                <div>
                    <img class="img-fluid img-thumbnail" :src="`${imgUrl}`" :hidden="img == ''">
                    <label for="cover_image" class="btn btn-secondary btn-sm d-flex">
                        <div class="mx-auto">
                            <span class="bi-upload me-2"></span> Cover
                        </div>
                    </label>
                    <input
                        type="file"
                        id="cover_image"
                        name="cover_image"
                        accept=".jpg, .jpeg, .png"
                        @change="previewFiles"
                        hidden />
                </div>
                <div class="row">
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Judul artikel..." v-model="title">
                    </div>
                    <div class="col-auto">
                        <select v-model="categoryId" class="form-select" aria-label="Default select example">
                            <option v-for="category in user.has_article_edit_access" :value="`${category.id}`">{{ category.name }}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <textarea class="form-control" rows="10" placeholder="Konten artikel.." v-model="content"></textarea>
                    <div class="fs-6 fw-light">
                        Note: konten di-format menggunakan <a class="hl" href="https://learnxinyminutes.com/docs/markdown/">Markdown</a>
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <button @click="createArticle" class="btn btn-primary text-white">Post</button>
                </div>
            </div>
        </div>

        <div class="col content-container p-4" :hidden="hiddenPreview">
            <h2 class="mb-4">
                Preview
            </h2>
            <article v-html="convertedContentToMarkdown"></article>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            content: '',
            hiddenPreview: false,
            imgUrl: '',
            img: '',
            categoryId: useRoute().query['initial-category-id']
        }
    },
    computed: {
        convertedContentToMarkdown() {
            const md = new MarkdownIt;
            return md.render(this.content)
        }
    },
    methods: {
        previewFiles(event) {
            this.img = event.target.files[0]
            this.imgUrl = URL.createObjectURL(this.img)
        },
        async createArticle(event) {
            document.getElementById("toggle_div").style.display="block";

            const auth = useAuth()
            const { user, apiKey } = storeToRefs(auth)

            const formData = new FormData()
            formData.append('title', this.title)
            formData.append('category_id', this.categoryId)
            formData.append('markdown_content', this.content)
            formData.append('cover_image', this.img)

            const { data: res, pending, refresh, error } = await useFetch('/articles', { 
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey.value}`
                },
                body: formData,
                baseURL: 'https://21337.live.reon.my.id/',
            })

            document.getElementById("toggle_div").style.display="none";
            await navigateTo('/articles/' + res.value.id)
        }
    }
}
</script>

<script setup>
import MarkdownIt from 'markdown-it';

const auth = useAuth()
const { user, apiKey } = storeToRefs(auth)
</script>

<style lang="scss" scoped>

</style>