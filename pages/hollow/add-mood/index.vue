<template>
  <TopMenu :isShowCenter="false">
    <template #navbar-left>
      <span
        class="iconfont icon-fanhui"
        style="font-size: 20px"
        @click="() => router.push('/hollow')"
      ></span>
    </template>
    <template #navbar-right>
      <span
        class="iconfont icon-fabu"
        style="font-size: 20px"
        @click="handleMoodPublish"
      ></span>
    </template>
  </TopMenu>
  <div
    class="page-container"
    v-loading="state.isLoading"
    element-loading-text="发布中..."
  >
    <MoodInput ref="moodInput" />
    <div class="role-container">
      <div class="center"></div>
      <div
        class="circle"
        v-for="item in 8"
        :key="item"
        :style="{
          transform: 'rotate(' + 45 * (item - 1) + 'deg) translate(100px)',
        }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { request, state } from '~/config/http.config'

import TopMenu from '~/components/common/TopMenu'
import MoodInput from '~/components/hollow/MoodInput'

definePageMeta({
  middleware: 'auth',
})

const router = useRouter()
const moodInput = ref<any>(null)

const handleMoodPublish = async () => {
  if (!moodInput.value?.moodText?.length) {
    ElMessage({
      message: '还没记录你的心情',
      center: true,
      type: 'warning',
      grouping: true,
      offset: 100,
    })
    return
  }
  const postData = {
    score: 5,
    tag: 'gpt',
    tags: moodInput.value?.tags,
    content: moodInput.value?.moodText,
  }
  await request('post', '/emotion_record/add', postData, (res: any) => {
    router.push('/hollow')
  })
}
</script>

<style lang="less" scoped>
.page-container {
  padding: var(--page-container-padding);
  margin-top: 50px;

  .role-container {
    width: 300px;
    height: 300px;
    position: relative;
    display: flex;
    margin: auto;
    .center {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: var(--primary-color-blue);
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -50px;
      margin-top: -50px;
    }

    .circle {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--primary-color-orange);
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -25px;
      margin-top: -25px;
      cursor: pointer;
    }
  }
}
</style>
