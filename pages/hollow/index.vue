<template>
  <TopMenu>
    <template #navbar-left>
      <span style="font-size: 20px">logo</span>
    </template>
    <template #navbar-right>
      <span
        class="iconfont icon-xinxiang-xiankuang"
        style="font-size: 20px"
      ></span>
    </template>
  </TopMenu>
  <div class="page-container">
    <el-skeleton
      style="width: 100%"
      :loading="state.isLoading"
      animated
      :count="3"
      :throttle="200"
    >
      <template #template>
        <div class="skeleton-container">
          <el-skeleton-item variant="text" class="time" />
          <el-skeleton-item variant="text" class="content" />
        </div>
      </template>
      <template #default>
        <EmotionList :list="emotionList" />
      </template>
    </el-skeleton>
  </div>
  <BottomMenu />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { request, state } from '~/config/http.config'
import { Emotions } from '~/types/hollow'

import BottomMenu from '~/components/common/BottomMenu'
import TopMenu from '~/components/common/TopMenu'
import EmotionList from '~/components/hollow/EmotionList'

definePageMeta({
  middleware: 'auth',
})

const emotionList = ref<Emotions[]>([])

const fetchMoodList = async () => {
  await request<{ emotionRecords: Emotions[] }>(
    'get',
    '/emotion_record/query',
    null,
    (res) => {
      emotionList.value = res.emotionRecords
    }
  )
}

onMounted(() => {
  fetchMoodList()
})
</script>

<style lang="less" scoped>
.page-container {
  margin-top: 100px;
  overflow-y: scroll;
  padding: var(--page-container-padding);
  margin-bottom: 30px;
  .skeleton-container {
    display: flex;
    margin-bottom: 24px;
    .time {
      margin-right: 30px;
      margin-top: 20px;
      width: 60px;
      height: 42px;
    }
    .content {
      width: 100%;
      height: 100px;
    }
  }
}
</style>
