<template>
  <div class="container">
    <div style="margin-right: 20px">
      <Circle size="40px" background="#FFBF6B">
        <div class="role">{{ GPTRole }}</div>
      </Circle>
    </div>
    <p>{{ reply }}</p>
  </div>
</template>

<script lang="ts" setup>
import Circle from '~/components/common/Circle'

defineProps<{
  GPTRole: string
  reply: string
}>()
</script>

<style lang="less" scoped>
.container {
  display: flex;

  font-size: var(--normal-font-size);
  .role {
    color: #fff;
  }
  p {
    white-space: pre-wrap;
  }
}
</style>
