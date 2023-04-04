<template>
  <div class="register-page">
    <div class="register-form">
      <h2 class="register-title">注册</h2>
      <el-form
        :model="form"
        :rules="rules"
        ref="registerForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input
            v-model.number="form.age"
            placeholder="请输入年龄"
          ></el-input>
        </el-form-item>
        <el-form-item label="邀请码" prop="inviteCode">
          <el-input
            v-model="form.inviteCode"
            placeholder="请输入邀请码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { request, state } from '~/config/http.config'
import { useHollowStore } from '~/store/hollow'

const hollowStore = useHollowStore()
const router = useRouter()

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

const handleRegister = async () => {
  const postData = {
    username: form.username,
    password: form.password,
    email: form.email,
    gender: form.gender,
    age: form.age,
    inviteCode: form.inviteCode,
  }

  await request('post', '/user/register', postData, (res: any) => {
    router.push('/hollow/login')
  })
}
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.register-form {
  padding: 20px;
}

.register-title {
  text-align: center;
  margin-bottom: 20px;
}
</style>
