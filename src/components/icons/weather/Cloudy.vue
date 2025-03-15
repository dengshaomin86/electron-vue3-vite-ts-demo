<!-- 多云 -->
<template>
  <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
    <!-- 定义渐变和阴影 -->
    <defs>
      <!-- 太阳的径向渐变 -->
      <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stop-color="#ffcc00" />
        <stop offset="100%" stop-color="#ff9900" />
      </radialGradient>

      <!-- 云朵的阴影 -->
      <filter id="cloudShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.3)" />
      </filter>
    </defs>

    <!-- 背景天空 -->
    <!-- <rect width="150" height="150" fill="#87CEEB" /> -->

    <!-- 太阳 -->
    <circle class="sun" cx="75" cy="50" r="20" fill="url(#sunGradient)" />

    <!-- 太阳光线 -->
    <line x1="75" y1="30" x2="75" y2="10" stroke="#ffcc00" stroke-width="2" />
    <line x1="95" y1="50" x2="115" y2="50" stroke="#ffcc00" stroke-width="2" />
    <line x1="75" y1="70" x2="75" y2="90" stroke="#ffcc00" stroke-width="2" />
    <line x1="55" y1="50" x2="35" y2="50" stroke="#ffcc00" stroke-width="2" />
    <line x1="90" y1="30" x2="105" y2="15" stroke="#ffcc00" stroke-width="2" />
    <line x1="90" y1="70" x2="105" y2="85" stroke="#ffcc00" stroke-width="2" />
    <line x1="60" y1="30" x2="45" y2="15" stroke="#ffcc00" stroke-width="2" />
    <line x1="60" y1="70" x2="45" y2="85" stroke="#ffcc00" stroke-width="2" />

    <!-- 云朵 -->
    <g class="cloud" filter="url(#cloudShadow)">
      <ellipse cx="50" cy="100" rx="30" ry="20" fill="url(#cloudGradient)" />
      <ellipse cx="80" cy="100" rx="30" ry="20" fill="url(#cloudGradient)" />
      <ellipse cx="30" cy="100" rx="30" ry="20" fill="url(#cloudGradient)" />
      <ellipse cx="60" cy="90" rx="30" ry="20" fill="url(#cloudGradient)" />
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

/* 定义云朵飘动的动画 */
@keyframes cloudFloat {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}

/* 太阳样式 */
.sun {
  fill: #ffcc00;
  animation: sunGlow 2s ease-in-out infinite;
}

/* 云朵样式 */
.cloud {
  fill: #f0f0f0;
  animation: cloudFloat 3s ease-in-out infinite;
}
</style>
