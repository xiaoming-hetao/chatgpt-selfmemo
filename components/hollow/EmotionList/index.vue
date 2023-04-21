<template>
  <div v-for="item of list" :key="item.id">
    <div class="container">
      <div class="time">
        <p>{{ dayjs(`${item.createTime}`).format('DD') }}日</p>
        <span>{{ dayjs(`${item.createTime}`).format('HH:mm') }}</span>
      </div>
      <Card @click="() => router.push(`/hollow/mood/${item.id}`)">
        <p class="content">
          {{ item.content }}
        </p>
        <!-- <div class="image">12</div> -->
        <div class="tag-conatiner">
          <template v-for="tagItem of item.tags">
            <div class="tag">#{{ tagItem }}</div>
          </template>
        </div>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Emotions } from '~/types/hollow'
import dayjs from 'dayjs'
import Card from '~/components/common/Card'

defineProps<{
  list: Emotions[]
}>()

const router = useRouter()
</script>

<style lang="less" scoped>
.container {
  display: flex;
  margin-bottom: 24px;
  .time {
    margin-top: 20px;
    width: 100px;
    p {
      font-size: 16px;
      font-weight: bold;
      color: #000000;
    }
    span {
      color: var(--primary-color-grey);
      font-size: var(--normal-font-size);
    }
  }
  .content {
    font-size: var(--normal-font-size);
    white-space: pre-wrap;
  }
  .tag-conatiner {
    display: flex;
    flex-wrap: wrap;
    .tag {
      color: var(--primary-color-blue);
      margin-top: 10px;
      font-size: var(--normal-font-size);
      margin-right: 5px;
    }
  }
}
</style>
