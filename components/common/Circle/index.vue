<template>
  <div
    class="circle"
    :style="{
      width: size,
      height: size,
      background: background,
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  size: string
  background: string
}>()
</script>

<style lang="less" scoped>
.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
</style>
