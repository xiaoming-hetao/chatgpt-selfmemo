<template>
  <div class="navbar">
    <div class="navbar-left">
      <slot name="navbar-left"></slot>
    </div>
    <div class="navbar-center" v-show="isShowCenter">
      <input type="text" placeholder="搜索" />
    </div>
    <div class="navbar-right">
      <slot name="navbar-right"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    isShowCenter?: boolean
  }>(),
  {
    isShowCenter: true,
  }
)
</script>

<style lang="less" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 50px;
  background-color: #fff;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);

  .navbar-center input {
    width: 100%;
    padding: 8px;
    border: none;
    border-radius: 20px;
    background-color: #f2f2f2;
  }

  .navbar-right {
    font-size: 24px;
    color: #333;
    cursor: pointer;
  }
}
</style>
