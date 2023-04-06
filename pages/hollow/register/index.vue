<template>
  <div class="register-page">
    <LogoConatiner />
    <div class="register-form">
      <el-card class="form-card">
        <el-form :model="form" :rules="rules" ref="registerFormRef">
          <el-form-item prop="username">
            <el-input
              :prefix-icon="UserFilled"
              v-model="form.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="form.password"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              :prefix-icon="Message"
              v-model="form.email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item prop="gender">
            <el-radio-group v-model="form.gender">
              <el-radio label="male">男</el-radio>
              <el-radio label="female">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="age">
            <el-input
              :prefix-icon="Histogram"
              v-model.number="form.age"
              placeholder="请输入年龄"
            ></el-input>
          </el-form-item>
          <el-form-item prop="inviteCode">
            <el-input
              :prefix-icon="Promotion"
              v-model="form.inviteCode"
              placeholder="请输入邀请码"
            ></el-input>
          </el-form-item>
          <div class="action">
            <p @click="() => router.push('/hollow/login')">登录</p>
          </div>
          <el-form-item>
            <el-button
              @click="handleRegister(registerFormRef)"
              color="#8093f2"
              style="color: #fff; width: 100%; height: 40px"
              round
              :loading="state.isLoading"
              >注册
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { request, state } from '~/config/http.config'
import {
  UserFilled,
  Lock,
  Message,
  Histogram,
  Promotion,
} from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'

import LogoConatiner from '~/components/hollow/LogoContainer'

const router = useRouter()

const registerFormRef = ref<FormInstance>()
const form = reactive({
  username: '',
  password: '',
  email: '',
  gender: '',
  age: '',
  inviteCode: '',
})
const rules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] },
  ],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', message: '请输入数字', trigger: ['blur', 'change'] },
  ],
  inviteCode: [{ required: true, message: '请输入邀请码', trigger: 'blur' }],
})

const handleRegister = async (formEl: FormInstance | undefined) => {
  await formEl?.validate(async (valid) => {
    if (valid) {
      const postData = {
        username: form.username,
        password: form.password,
        email: form.email,
        gender: form.gender,
        age: form.age,
        inviteCode: form.inviteCode,
      }

      await request('post', '/user/register', postData, () => {
        router.push('/hollow/login')
      })
    }
  })
}
</script>

<style lang="less" scoped>
.register-page {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .register-form {
    padding: 0 var(--page-container-padding);
    --el-color-primary: #8093f2;
    --el-font-size-base: 13px;
    .form-card {
      height: 420px;
      padding: 0 20px;
      margin-top: -30px;

      .action {
        display: flex;
        flex-direction: row-reverse;
        margin-bottom: 20px;
        margin-top: -6px;
        p {
          font-size: 12px;
          color: var(--primary-color-grey);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
