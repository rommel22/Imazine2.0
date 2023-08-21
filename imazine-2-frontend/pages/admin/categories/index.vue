<template>
    <div class="row align-items-start">
        <div class="category-card">
            <div class="content-container-overflow p-4">
                <div class="d-flex">
                    <h2 class="me-2">Kategori</h2>
                    <div class="dropend">
                        <span @click="categoryName = ''" class="btn-icon bi-plus-lg" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-offset="-16,6"></span>
                        <div class="dropdown-menu p-2" style="min-width: 300px;">
                            <div class="form-group d-flex gap-2">
                                <input v-model="categoryName" type="text" class="form-control" id="newCategoryForm" placeholder="Kategori baru...">
                                <button @click="newCategory()" type="button" class="bi-plus-lg btn btn-primary text-white p-2"></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-for="category in categories" :id="category.id">
                    <span @click="currentCategoryId = category.id" replace class="category-label d-flex gx-5 mt-2 lh-sm">
                        <div class="me-1">{{ category.name }}</div>
                        <div class="dropend">
                            <span @click="categoryName = category.name" class="category-control bi-pencil-fill" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-offset="-16,6"></span>
                            <div class="dropdown-menu p-2" style="min-width: 300px;">
                                <div class="form-group d-flex gap-2">
                                    <input v-model="categoryName" type="text" class="form-control" id="dropdownFormNpm" placeholder="Nama baru...">
                                    <button @click="renameCategory(category.id)" type="button" class="bi-pencil-fill btn btn-primary text-white p-2"></button>
                                </div>
                            </div>
                        </div>
                        <NuxtLink :to="`#${category.id}`" class="category-control bi-trash-fill">
                        </NuxtLink>
                    </span>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="content-container p-4 mb-4">
                <h2>
                    Tambahkan akses edit artikel pada kategori {{ currentCategory.name }}
                </h2>
                <div class="input-group py-3 px-2">
                    <span class="input-group-text">
                        <div class="bi-search"></div>
                    </span>
                    <input class="form-control" list="newUserOptions" v-model="searchQuery" placeholder="Cari user...">
                    <datalist id="newUserOptions">
                        <option v-for="user in searchUsers" :id="user.id" :value="user.id">{{ user.npm }} {{ user.name }}</option>
                    </datalist>
                    <button @click="addUserToCategory" class="btn btn-primary text-white bi-plus-lg"></button>
                </div>
            </div>
            <div class="content-container p-4">
                <h2>
                    User dengan akses edit artikel pada kategori {{ currentCategory.name }}
                </h2>
                <div v-for="user in currentArticleAccessUsers">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <div class="row m-0">
                            <img v-if="user.profile_picture_link != ''" class="circle my-auto" :src="user.profile_picture_link">
                            <img v-else class="circle my-auto" src="~/assets/placeholder_profile_pic.jpg">
                            <div class="col lh-sm">
                                <div>{{ user.name }}</div>
                                <div class="fw-light">{{ user.npm }}</div>
                            </div>
                        </div>
                        <span @click="deleteUserFromCategory(user.id)" class="bi-x text-danger" style="font-size: 1.5em;"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const auth = useAuth()
const { user, apiKey } = storeToRefs(auth)

const {data: categories} = await useFetch('/categories', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${apiKey.value}`
  },
  baseURL: 'https://21337.live.reon.my.id/'
})

const currentCategoryId = ref(categories.value[0].id);
const searchQuery = ref('');
const currentCategory = ref(categories.value.find(category => category.id == currentCategoryId.value))

watch(currentCategoryId, (newCategoryId, oldCategoryId) => {
    currentCategory.value = categories.value.find(category => category.id == newCategoryId);
    searchQuery.value = ''
});

watch(categories, (newCategories, oldCategories) => {
    currentCategory.value = categories.value.find(category => category.id == currentCategoryId.value);
    searchQuery.value = ''
});

const { data: searchUsers } = await useAsyncData(
    'users',
    () => $fetch('/users', {
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
        watch: searchQuery
    }
)

const { data: currentArticleAccessUsers } = await useAsyncData(
    'edit-access',
    () => $fetch('/admin/categories/edit-access', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey.value}`
        },
        query: {
            category: currentCategoryId.value
        },
        baseURL: 'https://21337.live.reon.my.id/'
    }),
    {
        watch: currentCategoryId
    }
)

async function addUserToCategory() {
    const formData = new FormData()
    formData.append('category_id', currentCategoryId.value)
    formData.append('user_id', searchQuery.value)

    const res = await $fetch(`/admin/categories/edit-access`, 
    {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey.value}`
        },
        body: formData,
        baseURL: 'https://21337.live.reon.my.id/'
    })

    searchQuery.value = ''
    refreshNuxtData()
}

async function deleteUserFromCategory(userId) {
    const formData = new FormData()
    formData.append('category_id', currentCategoryId.value)
    formData.append('user_id', userId)

    const res = await $fetch(`/admin/categories/edit-access`, 
    {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${apiKey.value}`
        },
        body: formData,
        baseURL: 'https://21337.live.reon.my.id/'
    })

    searchQuery.value = ''
    refreshNuxtData()
}

const categoryName = ref('')
async function renameCategory(categoryId) {
    const formData = new FormData()
    formData.append('name', categoryName.value)

    const res = await $fetch(`/categories/${categoryId}`, 
    {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${apiKey.value}`
        },
        body: formData,
        baseURL: 'https://21337.live.reon.my.id/'
    })
    refreshNuxtData()
}

async function newCategory() {
    const formData = new FormData()
    formData.append('name', categoryName.value)

    const res = await $fetch(`/categories`, 
    {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey.value}`
        },
        body: formData,
        baseURL: 'https://21337.live.reon.my.id/'
    })
    refreshNuxtData()
}
</script>

<style lang="scss" scoped>
.circle {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    object-fit: object-fit;
    padding: 0;
}
.category-card {
  width: 300px;
}

.category-label { 
    .category-control {
        visibility: hidden;
    } 
    &:hover .category-control { 
        visibility: visible; 
    }
}

.btn-icon {
    &:hover {
        cursor: pointer;
    }
}
</style>