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
    <div class="mood-record-container">
      <el-input
        ref="textareaRef"
        v-model="moodText"
        :autosize="{ minRows: 7, maxRows: 10 }"
        type="textarea"
        placeholder="记录此刻的心情……"
      />
      <div class="mood-action">
        <div @click="handleAddTag">#</div>
        <div class="iconfont icon-xingxing" />
        <div class="iconfont icon-tupian" />
      </div>
    </div>
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

definePageMeta({
  middleware: 'auth',
})

const router = useRouter()
const moodText = ref<string>('')
const textareaRef = ref<any>(null)

const handleAddTag = () => {
  moodText.value = `${moodText.value} #`
  textareaRef.value.focus()
}

const handleMoodPublish = async () => {
  if (!moodText.value?.length) {
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
    userId: 1,
    score: 5,
    tag: 'emo',
    content: moodText.value,
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
  .mood-record-container {
    position: relative;

    .mood-action {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 10px;
    }
    .mood-action div {
      cursor: pointer;
      margin: 0 10px;
    }
  }
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
