<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.card {
  border-radius: 10px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  padding: var(--card-container-padding);
  width: 100%;
}
</style>
