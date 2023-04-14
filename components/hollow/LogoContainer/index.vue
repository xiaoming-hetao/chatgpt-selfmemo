<template>
  <div class="logo-container">
    <Circle size="60px" background="#fff">
      <div class="logo">LOGO</div>
    </Circle>
  </div>
</template>

<script lang="ts" setup>
import Circle from '~/components/common/Circle'
</script>

<style lang="less" scoped>
.logo-container {
  width: 100%;
  background-image: linear-gradient(#e66465, #8093f2);
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo {
    color: var(--primary-color-grey);
  }
}
</style>
