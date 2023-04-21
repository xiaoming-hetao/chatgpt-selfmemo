import { isAuthenticated } from '~/utils/auth'

// 路由守卫
export default defineNuxtRouteMiddleware((to, from) => {
  const router = useRouter()
  // token 过期后需要重新登录
  if (isAuthenticated() === false) {
    ElMessage({
      message: '登录已过期，请重新登录',
      center: true,
      type: 'warning',
      offset: 100,
    })
    router.push('/hollow/login')
  }
})
