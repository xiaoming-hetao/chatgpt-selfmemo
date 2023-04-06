<template>
  <div class="continer">
    <!-- <div class="feature-entry">备忘录</div> -->
    <div class="feature-wrap">
      <div class="feature-entry" @click="() => router.push('/hollow')">
        树洞
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
</script>

<style lang="less" scoped>
// 公转动画
@keyframes planet-rotate {
  0% {
    transform: rotate(30deg) scaleY(0.5) rotate(0);
  }
  100% {
    transform: rotate(30deg) scaleY(0.5) rotate(360deg);
  }
}

// 自转动画
@keyframes self-rotate {
  0% {
    transform: rotate(0) scaleY(2) rotate(-45deg);
  }
  100% {
    transform: rotate(-360deg) scaleY(2) rotate(-45deg);
  }
}

.continer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: radial-gradient(circle, #5f8aea, #0d2354);

  .feature-wrap {
    position: relative;
    border: 2px solid #fff;
    transform-style: preserve-3d;
    width: 350px;
    height: 350px;
    transform: scaleY(0.5) rotateZ(45deg);
    border-radius: 50%;
    animation: planet-rotate 20s linear infinite;

    .feature-entry {
      cursor: pointer;
      text-align: center;
      line-height: 100px;
      background: #5c8cf5;
      position: absolute;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      font-size: 20px;
      color: #fff;
      left: calc(50% - 50px);
      top: -50px;
      transform: rotateZ(-45deg) scaleY(2);
      animation: self-rotate 20s linear infinite;

      &:hover {
        box-shadow: 3px 3px 30px #fff;
        background: #7da3f7;
      }
    }
  }
}
</style>
