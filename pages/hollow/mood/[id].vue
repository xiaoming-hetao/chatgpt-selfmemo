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
        class="iconfont icon-shanchu"
        style="font-size: 20px"
        @click="dialogVisible = true"
      ></span>
    </template>
  </TopMenu>
  <div class="page-container">
    <el-skeleton
      style="width: 100%"
      :loading="skeletonLoading"
      animated
      :throttle="10"
    >
      <template #template>
        <div class="skeleton-container">
          <el-skeleton-item variant="text" class="time" />
          <el-skeleton-item variant="text" class="content" />
        </div>
      </template>
      <template #default>
        <div class="top-title" v-show="moodDetail.createTime">
          <div class="date">
            {{ dayjs(`${moodDetail.createTime}`).format('DD') }}
          </div>
          <div class="time">
            <p>
              {{ dayjs(`${moodDetail.createTime}`).format('M') }}月/{{
                weekDay[dayjs(`${moodDetail.createTime}`).format('d')]
              }}
            </p>
            <span>{{ dayjs(`${moodDetail.createTime}`).format('HH:mm') }}</span>
          </div>
        </div>
        <el-divider />
        <p class="content">
          {{ moodDetail.content }}
        </p>
        <div class="content-extra-info">
          <div class="text-count">
            <span class="iconfont icon-M_wenzi" style="font-size: 20px"></span>
            <p>{{ moodDetail.content?.replace(/\s/g, '')?.length }} 字</p>
          </div>
          <div class="tag">
            <span class="iconfont icon-biaoqian" style="font-size: 20px"></span>
            <p>{{ moodDetail.tag }}</p>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="删除心情记录"
    width="320px"
    align-center
    center
  >
    <span> 是否确认删除？ </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          :loading="state.isLoading"
          @click="handleMoodDelete"
        >
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { request, state, ToastMessage } from '~/config/http.config'
import dayjs from 'dayjs'
import { Emotions, Week } from '~/types/hollow'
import TopMenu from '~/components/common/TopMenu'

const router = useRouter()
const route = useRoute()

const weekDay: Record<any, string> = {
  [Week.Sunday]: '周日',
  [Week.Monday]: '周一',
  [Week.Tuesday]: '周二',
  [Week.Wednesday]: '周三',
  [Week.Thursday]: '周四',
  [Week.Friday]: '周五',
  [Week.Saturday]: '周六',
}

const moodDetail = ref<Emotions>({} as Emotions)
const dialogVisible = ref<boolean>(false)
const skeletonLoading = ref<boolean>(false)
const toastMessage = ref<ToastMessage>({} as ToastMessage)

const fetchMoodDetail = async () => {
  skeletonLoading.value = true
  const params = {
    recordId: Number(route?.params?.id),
  }
  await request<{ emotionRecord: Emotions }>(
    'get',
    '/emotion_record/detail',
    params,
    (res) => {
      moodDetail.value = res.emotionRecord
      skeletonLoading.value = false
    }
  )
}

const handleMoodDelete = async () => {
  const postData = {
    id: Number(route?.params?.id),
  }
  await request(
    'post',
    '/emotion_record/delete',
    postData,
    () => {
      dialogVisible.value = false
      toastMessage.value = { message: '删除成功', type: 'success' }
      router.push('/hollow')
    },
    (err) => {},
    () => {
      return toastMessage.value
    }
  )
}

onMounted(() => {
  fetchMoodDetail()
})
</script>

<style lang="less" scoped>
.page-container {
  padding: var(--page-container-padding);
  margin-top: 50px;

  .skeleton-container {
    .time {
      width: 100%;
      height: 50px;
      margin-bottom: 20px;
    }
    .content {
      width: 100%;
      height: 200px;
    }
  }
  .top-title {
    display: flex;
    align-items: center;
    .date {
      font-size: 24px;
      margin-right: 20px;
    }
    .time {
      color: var(--primary-color-grey);
      font-size: 12px;
    }
  }
  .content {
    white-space: pre-wrap;
    font-size: 14px;
  }
  .content-extra-info {
    margin-top: 20px;
    .text-count,
    .tag {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      color: var(--primary-color-grey);
      p {
        margin-left: 10px;
        font-size: 12px;
      }
    }
  }
}
</style>
