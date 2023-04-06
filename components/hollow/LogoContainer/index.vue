<template>
  <div class="logo-container">
    <div class="logo">LOGO</div>
  </div>
</template>

<style lang="less" scoped>
.logo-container {
  width: 100%;
  background-image: linear-gradient(#e66465, #8093f2);
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #fff;
    color: var(--primary-color-grey);
  }
}
</style>
