<template>
  <div class="login-wrapper">
    <el-form :model="loginForm" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="loginForm.username" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          type="password"
          v-model="loginForm.password"
          show-password
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleSubmit"
          :loading="state.isLoading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { request, state } from '~/config/http.config'
import { useHollowStore } from '~/store/hollow'

const hollowStore = useHollowStore()
const router = useRouter()

const loginForm = reactive({
  username: '',
  password: '',
})

const handleSubmit = async () => {
  const postData = {
    username: loginForm.username,
    password: loginForm.password,
  }

  await request('post', '/user/login', postData, (res: any) => {
    const token = res.data?.token
    hollowStore.setUserToken(token)
    localStorage.setItem('token', token)
    router.push('/hollow')
  })
}
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
