<template>
    <li class="nav-item dropdown">
        <span class="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Login
        </span>
        <ul class="dropdown-menu dropdown-menu-end p-4" style="min-width: 300px;">
            <div v-if="errorMessage.valueOf() != ''" class="alert alert-danger d-flex align-items-center p-1" role="alert">
                <div class="mx-auto">
                    {{ errorMessage }}
                </div>
            </div>
            <div class="d-grid gap-3">
                <div class="form-group">
                    <label for="dropdownFormNpm">NPM</label>
                    <input type="text" class="form-control" id="dropdownFormNpm" v-model="npm">
                </div>
                <div class="form-group">
                    <label for="dropdownFormPassword">Password</label>
                    <input type="password" class="form-control" id="dropdownFormPassword" v-model="password">
                </div>
                <span @click="login" class="btn btn-primary">Login</span>
            </div>
        </ul>
    </li>
</template>

<script setup>
const auth = useAuth()
async function login(event) {
    window.document.querySelectorAll('.dropdown-menu').forEach(function(dropdown) {
        dropdown.addEventListener('click', function(e) {
            e.stopImmediatePropagation();
        });
    });

    const formData = new FormData()
    formData.append('npm', npm.value)
    formData.append('password', password.value)

    let statusCode
    const data = await $fetch('https://21337.live.reon.my.id/login', { 
        method: 'POST', 
        body: formData,
        async onResponse({ request, response, options }) {
            statusCode = response.status
        }
    })
    .catch((error) => error.data)

    if (statusCode !== 200) {
        errorMessage.value = data.message
        return
    }

    auth.isLoggedIn = true
    auth.apiKey = data.apiKey
    auth.user = data.user

    refreshNuxtData()
}

const npm = ref('')
const password = ref('')
const errorMessage = ref('')
</script>

<style lang="scss" scoped>
.navbar-nav {
    align-items: center;
    justify-content: center;
}

img {
    border-radius: 50%;
    width: 30px;
}
</style>