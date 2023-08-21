export const useAuth = defineStore({
    id: 'auth',
    state: () => ({
        isLoggedIn: false,
        apiKey: '',
        user: {}
    }),
    actions: {
        async renewUserData() {
            if (!this.isLoggedIn) return

            const response = await $fetch("https://21337.live.reon.my.id/me", {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                },
            })
            .catch((error) => error.data)

            this.user = response as any
        }
    },
    persist: true
})
