<template>
    <div class="content-container p-4" style="height: 90vh">
        <div class="row justify-content-between">
            <div class="col my-auto">
                <h2>
                    Daftar Pengguna
                </h2>
            </div>
            <div class="col-auto">
                <button @click="currentEditUser = null" class="btn btn-primary text-white bi-plus-lg me-2" data-bs-toggle="modal" :data-bs-target="`#newUserModal`">Pengguna</button>
                <div class="modal fade" :id="`newUserModal`" tabindex="-1" aria-labelledby="newUserModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="newUserModalLabel">Tambahkan Pengguna</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3 row">
                                    <label for="newUserName" class="col-sm-2 col-form-label">Nama</label>
                                    <div class="col-sm-10">
                                    <input v-model="currentEditUserName" type="text" class="form-control" id="newUserName">
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="newUserNpm" class="col-sm-2 col-form-label">NPM</label>
                                    <div class="col-sm-10">
                                    <input v-model="currentEditUserNpm" type="text" class="form-control" id="newUserNpm">
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="newUserEmail" class="col-sm-2 col-form-label">Email</label>
                                    <div class="col-sm-10">
                                    <input v-model="currentEditUserEmail" type="text" class="form-control" id="newUserEmail">
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <div data-bs-dismiss="modal">
                                    <button @click="newUser" type="button" class="btn btn-primary text-white">
                                        Tambah
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary text-white bi-plus-lg" data-bs-toggle="modal" :data-bs-target="`#csvModal`">csv</button>
                <div class="modal fade" :id="`csvModal`" tabindex="-1" aria-labelledby="csvModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="csvModalLabel">Tambahkan Pengguna</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <label for="formFile" class="form-label">File CSV</label>
                                <input @change="updateCsvFile" class="form-control" type="file" id="formFile" aria-describedby="csvHelpBlock">
                                <div id="csvHelpBlock" class="form-text">
                                    File csv mengikuti <NuxtLink class="text-primary" to="https://gist.githubusercontent.com/AncuL001/b8172dbabcb1ad56f9d332dadebba034/raw/add8be44401a9a556ed7851688e09da3eb8971ba/new_users_template.csv">template ini</NuxtLink>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <div data-bs-dismiss="modal">
                                    <button @click="newUsersCsv" type="button" class="btn btn-primary text-white">
                                        Tambah
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="px-2" style="height: 100%">
            <div class="input-group pt-3 pb-4">
                <span class="input-group-text">
                    <div class="bi-search"></div>
                </span>
                <input class="form-control" v-model="searchQuery" placeholder="Cari user...">
            </div>
            <div class="overflow-y-scroll" style="height: 87%">
                <div v-for="user in searchUsers">
                    <div class="d-flex justify-content-between align-items-center mb-2 mx-2">
                        <div class="row m-0">
                            <img v-if="user.profile_picture_link != ''" class="circle my-auto" :src="user.profile_picture_link">
                            <img v-else class="circle my-auto" src="~/assets/placeholder_profile_pic.jpg">
                            <div class="col lh-sm">
                                <div>{{ user.name }}</div>
                                <div class="fw-light">{{ user.npm }}</div>
                            </div>
                        </div>
                        <span @click="currentEditUser = user" class="bi-pencil-fill" data-bs-toggle="modal" :data-bs-target="`#editUserModal`"></span>
                    </div>

                    <div class="modal fade" :id="`editUserModal`" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="editUserModalLabel">Ubah Data Pengguna</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="d-flex mb-3" style="justify-content: center;">
                                        <img v-if="currentEditUser && currentEditUser.profile_picture_link != ''" class="big-circle my-auto" :src="currentEditUser.profile_picture_link">
                                        <img v-else class="big-circle my-auto" src="~/assets/placeholder_profile_pic.jpg">
                                    </div>
                                    <div class="mb-3 row">
                                        <label for="updateUserName" class="col-sm-2 col-form-label">Nama</label>
                                        <div class="col-sm-10">
                                        <input v-model="currentEditUserName" type="text" class="form-control" id="updateUserName">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label for="updateUserNpm" class="col-sm-2 col-form-label">NPM</label>
                                        <div class="col-sm-10">
                                        <input v-model="currentEditUserNpm" type="text" class="form-control" id="updateUserNpm">
                                        </div>
                                    </div>
                                    <div class="row pt-2">
                                        <div class="col-sm-2"></div>
                                        <div class="col-sm-10">
                                            <input v-model="currentEditUserIsAdmin" type="checkbox" class="form-check-input" id="updateUserIsAdmin">
                                            <label for="updateUserIsAdmin" class="col-check-label ps-2">Admin</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <div data-bs-dismiss="modal">
                                        <button @click="editUser(currentEditUser.id)" type="button" class="btn btn-primary text-white">
                                            Ubah
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const auth = useAuth()
const { user, apiKey } = storeToRefs(auth)

const searchQuery = ref('');

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

const currentEditUser = ref(null);
const currentEditUserName = ref('');
const currentEditUserNpm = ref('');
const currentEditUserEmail = ref('');
const currentEditUserIsAdmin = ref(false);

watch(currentEditUser, (newUser, oldUser) => {
    if (newUser == null) {
        currentEditUserName.value = '';
        currentEditUserNpm.value = '';
        currentEditUserEmail.value = '';
        currentEditUserIsAdmin.value = false;
    }
    else {
        currentEditUserName.value = newUser.name;
        currentEditUserNpm.value = newUser.npm;
        currentEditUserEmail.value = newUser.email;
        currentEditUserIsAdmin.value = newUser.is_admin;
    }
})

async function newUser() {
    const formData = new FormData()
    formData.append('name', currentEditUserName.value)
    formData.append('npm', currentEditUserNpm.value)
    formData.append('email', currentEditUserEmail.value)

    const res = await $fetch(`/admin/users`, 
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

const csvFile = ref(null)
function updateCsvFile(event) {
    csvFile.value = event.target.files[0]
}

async function newUsersCsv() {
    if (csvFile.value == null) {
        return
    }

    const formData = new FormData()
    formData.append('file', csvFile.value)

    const res = await $fetch(`/admin/users/add-csv`, 
    {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey.value}`
        },
        body: formData,
        baseURL: 'https://21337.live.reon.my.id/'
    })
    csvFile.value = null
    refreshNuxtData()
}

async function editUser(userId) {
    const formData = new FormData()
    formData.append('name', currentEditUserName.value)
    formData.append('npm', currentEditUserNpm.value)
    formData.append('isadmin', currentEditUserIsAdmin.value)

    const res = await $fetch(`/admin/users/${userId}`, 
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

</script>


<style lang="scss" scoped>
.circle {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    object-fit: object-fit;
    padding: 0;
}

.big-circle {
    border-radius: 50%;
    width: 200px;
    height: 200px;
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