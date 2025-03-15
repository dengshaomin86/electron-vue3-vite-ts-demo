<!-- 晴 -->
<template>
  <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
    <!-- 定义太阳的径向渐变 -->
    <defs>
      <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stop-color="#ffcc00" />
        <stop offset="100%" stop-color="#ff9900" />
      </radialGradient>
    </defs>

    <!-- 背景天空 -->
    <!-- <rect width="150" height="150" fill="#87CEEB" /> -->

    <!-- 太阳 -->
    <circle class="sun" cx="75" cy="75" r="20" fill="url(#sunGradient)" />

    <!-- 太阳光线 -->
    <g class="rays">
      <line class="ray" x1="75" y1="55" x2="75" y2="35" />
      <line class="ray" x1="95" y1="75" x2="115" y2="75" />
      <line class="ray" x1="75" y1="95" x2="75" y2="115" />
      <line class="ray" x1="55" y1="75" x2="35" y2="75" />
      <line class="ray" x1="90" y1="55" x2="105" y2="40" />
      <line class="ray" x1="90" y1="95" x2="105" y2="110" />
      <line class="ray" x1="60" y1="55" x2="45" y2="40" />
      <line class="ray" x1="60" y1="95" x2="45" y2="110" />
    </g>
  </svg>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
svg {
  width: 1em;
  height: 1em;
}

/* 定义太阳光线的动画 */
@keyframes sunGlow {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

/* 定义太阳光线的旋转动画 */
@keyframes rotateRays {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 太阳样式 */
.sun {
  fill: #ffcc00;
  animation: sunGlow 2s ease-in-out infinite;
}

/* 太阳光线容器 */
.rays {
  animation: rotateRays 10s linear infinite;
  transform-origin: center;
}

/* 太阳光线样式 */
.ray {
  stroke: #ffcc00;
  stroke-width: 2;
}
</style>
