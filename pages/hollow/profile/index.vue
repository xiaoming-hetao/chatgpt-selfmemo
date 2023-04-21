<template>
  <TopMenu>
    <template #navbar-left>
      <span
        class="iconfont icon-fanhui"
        style="font-size: 20px"
        @click="() => router.push('/hollow')"
      ></span>
    </template>
    <template #navbar-center>
      <span>个人中心</span>
    </template>
  </TopMenu>
  <div class="page-container">
    <el-skeleton
      style="width: 100%"
      :loading="state.isLoading"
      animated
      :throttle="10"
    >
      <template #template>
        <div class="skeleton-container">
          <div class="skeleton-avater">
            <el-skeleton-item variant="text" class="circle" />
            <div class="profile">
              <el-skeleton-item variant="text" />
              <el-skeleton-item variant="text" />
            </div>
          </div>
          <el-skeleton-item variant="text" class="join-time" />

          <div class="summary">
            <el-skeleton-item variant="text" class="summary-item" />
            <el-skeleton-item variant="text" class="summary-item" />
            <el-skeleton-item variant="text" class="summary-item" />
          </div>
        </div>
      </template>
      <template #default>
        <div class="avater">
          <Circle size="60px" background="#FFBF6B">
            <div>头像</div>
          </Circle>
          <div class="profile">
            <p>{{ userInfo.username }}</p>
            <p>天生我材必有用，千金散尽还复来</p>
          </div>
        </div>
        <p style="margin: 20px 0">
          你已经加入树洞
          <span style="color: #ffbf6b">{{
            today.diff(dayjs(userInfo.registerTime), 'day')
          }}</span>
          天
        </p>
        <div class="summary">
          <div class="summary-item">
            <span>21</span>
            <p>心情</p>
          </div>
          <div class="summary-item">
            <span>11</span>
            <p>标签</p>
          </div>
          <div class="summary-item">
            <span>99</span>
            <p>情绪分数</p>
          </div>
        </div>
      </template>
    </el-skeleton>

    <div class="feature-card">
      <template v-for="item of featureList">
        <div class="list-item" @click="handleItemClick(item.title)">
          <div class="list-item-desc">
            <span :class="item.iconfont"></span>
            <p>{{ item.title }}</p>
          </div>
          <el-icon style="margin-right: 24px"><ArrowRightBold /></el-icon>
        </div>
      </template>
      <div style="margin: 10px 24px">
        <el-button
          @click="handleLogout"
          color="#FFBF6B"
          class="logoutBtn"
          round
          :loading="logoutLoading"
          >退出登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import dayjs from 'dayjs'
import { ArrowRightBold } from '@element-plus/icons-vue'
import { request, state } from '~/config/http.config'
import { User } from '~/types/user'

import TopMenu from '~/components/common/TopMenu'
import Circle from '~/components/common/Circle'

definePageMeta({
  middleware: 'auth',
})

const router = useRouter()

const userInfo = reactive({
  username: '',
  registerTime: '',
})

const today = dayjs()
const logoutLoading = ref<boolean>(false)

const featureList = [
  {
    iconfont: 'iconfont icon-biji',
    title: '心情',
  },
  {
    iconfont: 'iconfont icon-biaoqian',
    title: '标签',
  },
  {
    iconfont: 'iconfont icon-xingxing',
    title: '情绪评分',
  },
  {
    iconfont: 'iconfont icon-bianji1',
    title: '修改信息',
  },
]

const handleItemClick = (title: string) => {
  switch (title) {
    case '心情':
      router.push('/hollow/profile/all-mood')
      break
    case '标签':
      router.push('/hollow/profile/all-tags')
      break
    case '情绪评分':
      router.push('/hollow/profile/mood-rate')
      break
    case '修改信息':
      router.push('/hollow/profile/update')
      break
    default:
      break
  }
}

const handleLogout = () => {
  logoutLoading.value = true
  setTimeout(() => {
    logoutLoading.value = false
    localStorage.removeItem('token')
    router.push('/hollow/login')
  }, 500)
}

const fetchUserInfo = async () => {
  await request<User>('get', '/user/profile/query', null, (res) => {
    userInfo.username = res.username
    userInfo.registerTime = res.registerTime
  })
}

onMounted(() => {
  fetchUserInfo()
})
</script>

<style lang="less" scoped>
.page-container {
  padding: var(--page-container-padding);
  margin-top: 50px;

  .skeleton-container {
    .skeleton-avater {
      display: flex;
      .circle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      .profile {
        width: 160px;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }

    .join-time {
      margin: 20px 0;
      width: 200px;
    }

    .summary {
      display: flex;
      .summary-item {
        width: 50px;
        height: 50px;
        margin-right: 30px;
      }
    }
  }
  .avater {
    display: flex;
    font-size: var(--normal-font-size);
    .profile {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }

  .summary {
    display: flex;
    .summary-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 30px;
      span {
        font-size: var(--normal-font-size);
        color: var(--primary-color-blue);
      }
      p {
        font-size: 14px;
      }
    }
  }
  .feature-card {
    position: fixed;
    z-index: 999;
    left: 0;
    bottom: 0;
    height: calc(100vh - 270px);
    background: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 100%;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);

    .list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      .list-item-desc {
        display: flex;
        align-items: center;

        span {
          margin: 24px;
        }
      }
    }
    .logoutBtn {
      color: #fff;
      width: 100%;
      height: 40px;
    }
  }
}
</style>
