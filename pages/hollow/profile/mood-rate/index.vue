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
      <span>情绪曲线</span>
    </template>
  </TopMenu>
  <div class="page-container">
    <el-skeleton
      style="width: 100%"
      :loading="state.isLoading"
      animated
      :throttle="200"
    >
      <template #template>
        <el-skeleton-item variant="text" class="skeleton-item" />
      </template>
      <template #default>
        <canvas id="chart"></canvas>
      </template>
    </el-skeleton>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { request, state } from '~/config/http.config'
import Chart from 'chart.js/auto'
import { MoodRate } from '~/types/hollow'

import TopMenu from '~/components/common/TopMenu'

const router = useRouter()

const chartData = reactive({
  label: [] as string[],
  data: [] as number[],
})

const drawMoodLineChart = (labels: string[], data: number[]) => {
  const ctx = document.getElementById('chart')

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: '情绪分数',
          data,
          borderWidth: 1,
          borderColor: '#FFBF6B',
          backgroundColor: '#FFBF6B',
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: '情绪变化曲线',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
}

const fetchMoodRateData = async () => {
  const params = {
    startTime: '2022-01-01',
    endTime: '2022-01-31',
  }

  await request<{ curveData: MoodRate[] }>(
    'get',
    '/emotion_record/trend',
    params,
    (res) => {
      chartData.label = res.curveData?.map((item: MoodRate) => item.date)
      chartData.data = res.curveData?.map((item: MoodRate) =>
        Number(item.score?.toFixed())
      )
      drawMoodLineChart(chartData.label, chartData.data)
    }
  )
}

onMounted(() => {
  fetchMoodRateData()
})
</script>

<style lang="less" scoped>
.page-container {
  padding: var(--page-container-padding);
  margin-top: 50px;

  .skeleton-item {
    width: 100%;
    height: 200px;
  }
}
</style>
