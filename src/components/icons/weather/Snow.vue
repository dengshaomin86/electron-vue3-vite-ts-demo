<!-- 雪 -->
<template>
  <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
    <!-- 背景 -->
    <!-- <rect width="150" height="150" fill="#e0f7fa" /> -->

    <!-- 雪花 -->
    <g class="snowflake" transform="translate(75, 75)">
      <!-- 雪花的基本形状 -->
      <line x1="0" y1="-30" x2="0" y2="30" />
      <line x1="-30" y1="0" x2="30" y2="0" />
      <line x1="-21.21" y1="-21.21" x2="21.21" y2="21.21" />
      <line x1="-21.21" y1="21.21" x2="21.21" y2="-21.21" />
      <!-- 雪花的细节 -->
      <line x1="-10" y1="-30" x2="10" y2="-30" />
      <line x1="-10" y1="30" x2="10" y2="30" />
      <line x1="-30" y1="-10" x2="-30" y2="10" />
      <line x1="30" y1="-10" x2="30" y2="10" />
      <line x1="-24.24" y1="-24.24" x2="-15.15" y2="-15.15" />
      <line x1="24.24" y1="24.24" x2="15.15" y2="15.15" />
      <line x1="-24.24" y1="24.24" x2="-15.15" y2="15.15" />
      <line x1="24.24" y1="-24.24" x2="15.15" y2="-15.15" />
    </g>
  </svg>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
svg {
  width: 1em;
  height: 1em;
}

/* 定义雪花旋转的动画 */
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 定义雪花闪烁的动画 */
@keyframes sparkle {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

/* 雪花样式 */
.snowflake {
  fill: none;
  stroke: #87ceeb;
  stroke-width: 2;
  animation: rotate 5s linear infinite, sparkle 2s ease-in-out infinite;
  transform-origin: center;
}
</style>
