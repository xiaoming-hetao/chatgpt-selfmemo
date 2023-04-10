<template>
  <div class="login-wrapper">
    <LogoConatiner />
    <div class="form-container">
      <el-card class="form-card">
        <el-form
          :model="loginForm"
          ref="loginFormRef"
          :rules="rules"
          style="margin-top: 40px"
        >
          <el-form-item prop="username">
            <el-input
              :prefix-icon="UserFilled"
              v-model="loginForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              v-model="loginForm.password"
              show-password
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <div class="action">
            <p @click="() => router.push('/hollow/register')">注册</p>
            <p>忘记密码</p>
          </div>
          <el-form-item>
            <el-button
              @click="handleSubmit(loginFormRef)"
              color="#8093f2"
              style="color: #fff; width: 100%; height: 40px"
              round
              :loading="isLoading"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { request, state } from '~/config/http.config'
import { useHollowStore } from '~/store/hollow'
import type { FormInstance } from 'element-plus'

import LogoConatiner from '~/components/hollow/LogoContainer'
import { fa } from 'element-plus/es/locale'

const hollowStore = useHollowStore()
const router = useRouter()

const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
  username: '',
  password: '',
})
const rules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
const isLoading = ref<boolean>(false)

const handleSubmit = async (formEl: FormInstance | undefined) => {
  await formEl?.validate(async (valid) => {
    if (valid) {
      isLoading.value = true
      const postData = {
        username: loginForm.username,
        password: loginForm.password,
      }

      request(
        'post',
        '/user/login',
        postData,
        (res: any) => {
          isLoading.value = false
          const token = res?.token
          hollowStore.setUserToken(token)
          localStorage.setItem('token', token)
          router.push('/hollow')
        },
        (err) => {
          console.log(err)
          isLoading.value = false
        }
      )
    }
  })
}
</script>

<style lang="less" scoped>
.login-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .form-container {
    padding: 0 var(--page-container-padding);
    --el-color-primary: #8093f2;
    --el-font-size-base: 13px;
    .form-card {
      height: 300px;
      padding: 0 20px;
      margin-top: -30px;
    }
    .action {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      margin-top: -6px;
      p {
        font-size: 12px;
        color: var(--primary-color-grey);
        cursor: pointer;
      }
    }
  }
}
</style>
