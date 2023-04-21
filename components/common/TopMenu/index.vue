<template>
  <div class="container">
    <div class="navbar">
      <div class="navbar-left">
        <slot name="navbar-left"></slot>
      </div>
      <div class="navbar-center">
        <slot name="navbar-center"></slot>
      </div>
      <div class="navbar-right">
        <slot name="navbar-right"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  position: fixed;
  width: 100%;
  top: 0;

  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    height: 50px;
    background-color: #fff;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);

    .navbar-right {
      font-size: 24px;
      color: #333;
      cursor: pointer;
    }
  }
}
</style>
