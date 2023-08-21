export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth()
  await auth.renewUserData()

  if (!auth.isLoggedIn && to.path != '/') {
    return navigateTo('/', { redirectCode: 401 })
  }
})