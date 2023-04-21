<template>
  <TopMenu>
    <template #navbar-left>
      <span
        class="iconfont icon-fanhui"
        style="font-size: 20px"
        @click="() => router.push('/hollow/profile')"
      ></span>
    </template>
    <template #navbar-center>
      <span>修改信息</span>
    </template>
  </TopMenu>

  <div class="page-container">
    <el-form :model="form" :rules="rules" ref="formRef">
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

      <el-form-item>
        <el-button
          @click="handleUpdate(formRef)"
          color="#FFBF6B"
          style="color: #fff; width: 100%; height: 40px"
          round
          :loading="state.isLoading"
          :disabled="isDisableConfirmBtn"
          >提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import { request, state } from '~/config/http.config'
import { UserFilled, Lock, Message } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'

import TopMenu from '~/components/common/TopMenu'

const router = useRouter()

const formRef = ref<FormInstance>()
const form = reactive({
  username: '',
  password: '',
  email: '',
})
const rules = ref({
  email: [
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] },
  ],
})

const isDisableConfirmBtn = computed(() => {
  if (!form.username && !form.password && !form.email) {
    return true
  }
  return false
})

const handleUpdate = async (formEl: FormInstance | undefined) => {
  await formEl?.validate(async (valid) => {
    if (valid) {
      const postData = {
        username: form.username,
        password: form.password,
        email: form.email,
      }

      await request('post', '/user/profile/update', postData, () => {
        router.push('/hollow/profile')
      })
    }
  })
}
</script>

<style lang="less" scoped>
.page-container {
  margin-top: 100px;
  padding: 0 var(--page-container-padding);
  --el-color-primary: #ffbf6b;
  --el-font-size-base: 13px;
}
</style>
