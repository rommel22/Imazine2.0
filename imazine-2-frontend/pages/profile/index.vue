<template>
    <div class="content-container p-5 mb-4">
        <div class="row justify-content-between">
            <div class="col my-auto">
                <h1>{{ user.name }}</h1>
                <hr class="border opacity-100">
                <h4>{{ user.npm }}</h4>
            </div>
            <div class="ms-4 col-auto">
                <img v-if="user.profile_picture_link != ''" class="big-circle my-auto" :src="user.profile_picture_link">
                <img v-else class="big-circle my-auto" src="~/assets/placeholder_profile_pic.jpg">
                <label for="cover_image" class="btn btn-secondary btn-sm d-flex">
                    <div class="mx-auto">
                        <span class="bi-upload me-2"></span>Upload Foto Profil
                    </div>
                </label>
                <input
                    type="file"
                    id="cover_image"
                    name="cover_image"
                    accept=".jpg, .jpeg, .png"
                    @change="uploadProfilePicture"
                    hidden />
            </div>
        </div>
    </div>
    <div class="content-container mb-3">
        <div class="row m-0">
            <div class="p-4 col-2" style="border-right: solid 1px #bdbdbd">
                <h2>Profil</h2>
            </div>
            <div class="col p-4">
                <div class="row mb-3">
                    <label for="newEmail" class="col-sm-3 col-form-label">Email</label>
                    <div class="col-sm-5">
                        <input type="text" readonly class="form-control-plaintext" id="newEmail" :value="user.email">
                    </div>
                </div>
                <div class="row">
                    <label for="newEmail" class="col-sm-3 col-form-label">Email Baru</label>
                    <div class="col-sm-5">
                        <input v-model="newEmail" type="text" class="form-control" id="newEmail">
                        <button @click="updateEmail" class="btn btn-primary text-white mt-3" >Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="content-container">
        <div class="row m-0">
            <div class="p-4 col-2" style="border-right: solid 1px #bdbdbd">
                <h2>Password</h2>
            </div>
            <div class="col p-4">
                <div class="mb-5 row">
                    <label for="currentPassword" class="col-sm-3 col-form-label">Password Sekarang</label>
                    <div class="col-sm-5">
                        <input v-model="oldPassword" type="password" class="form-control" id="currentPassword">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="newPassword" class="col-sm-3 col-form-label">Password Baru</label>
                    <div class="col-sm-5">
                        <input v-model="newPassword" type="password" class="form-control" id="newPassword">
                    </div>
                </div>
                <div class="row">
                    <label for="repeatNewPassword" class="col-sm-3 col-form-label">Ulangi Password Baru</label>
                    <div class="col-sm-5">
                        <input v-model="repeatNewPassword" type="password" class="form-control" id="repeatNewPassword">
                        <button @click="updatePassword" class="btn btn-primary text-white mt-3">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const auth = useAuth()
const { user, apiKey } = storeToRefs(auth)

async function uploadProfilePicture(event) {
    const formData = new FormData()
    formData.append('image', event.target.files[0])

    const res = await $fetch(`/profile/profile-picture`, { 
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey.value}`
        },
        body: formData,
        baseURL: 'https://21337.live.reon.my.id/',
    })

    auth.renewUserData()
    refreshNuxtData()
}

const newEmail = ref('')

async function updateEmail(event) {
    const formData = new FormData()
    formData.append('email', newEmail.value)

    const res = await $fetch(`/profile`, 
    {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${apiKey.value}`
        },
        body: formData,
        baseURL: 'https://21337.live.reon.my.id/'
    })

    newEmail.value = ''
    auth.renewUserData()
    refreshNuxtData()
}

const oldPassword = ref('')
const newPassword = ref('')
const repeatNewPassword = ref('')

async function updatePassword(event) {
    const formData = new FormData()
    formData.append('oldPassword', oldPassword.value)
    formData.append('newPassword', newPassword.value)
    formData.append('repeatNewPassword', repeatNewPassword.value)

    const res = await $fetch(`/profile/password`, 
    {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey.value}`
        },
        body: formData,
        baseURL: 'https://21337.live.reon.my.id/'
    })

    oldPassword.value = ''
    newPassword.value = ''
    repeatNewPassword.value = ''
}
</script>

<style lang="scss" scoped>
.big-circle {
    border-radius: 50%;
    width: 200px;
    height: 200px;
    object-fit: object-fit;
    padding: 0;
}
</style>