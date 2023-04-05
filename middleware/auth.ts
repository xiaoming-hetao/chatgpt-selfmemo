import { isAuthenticated } from '~/utils/auth'

// 路由守卫
export default defineNuxtRouteMiddleware((to, from) => {
  const router = useRouter()
  // token 过期后需要重新登录
  if (isAuthenticated() === false) {
    router.push('/hollow/login')
  }
})
