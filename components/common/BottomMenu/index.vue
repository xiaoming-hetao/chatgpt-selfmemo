<template>
  <div class="bottom-nav">
    <div
      v-for="(item, index) in tabItems"
      :key="index"
      :class="{ active: activeIndex === index }"
      @click="activeIndex = index"
    >
      <span :class="`${item.icon}`"></span>
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref<number>(0)
const tabItems = [
  { title: '首页', icon: 'iconfont icon-shouye' },
  { title: '随记', icon: 'iconfont icon-bianji' },
  { title: '我的', icon: 'iconfont icon-geren' },
]
</script>

<style lang="less" scoped>
.bottom-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  box-shadow: 0 0 2px #bebebe;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.bottom-nav div {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #666;
}

.bottom-nav div.active {
  color: var(--primary-color-orange);
}
</style>
