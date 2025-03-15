<!-- 雨 -->
<template>
  <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
    <!-- 云 -->
    <ellipse cx="80" cy="40" rx="35" ry="25" fill="url(#cloudGradient)" filter="url(#cloudShadow)" />
    <ellipse cx="40" cy="40" rx="35" ry="25" fill="url(#cloudGradient)" filter="url(#cloudShadow)" />
    <ellipse cx="60" cy="30" rx="35" ry="25" fill="url(#cloudGradient)" filter="url(#cloudShadow)" />

    <!-- 雨滴 -->
    <path class="raindrop" d="M40 80 Q45 85 50 80 T60 90 Q55 95 50 90 T40 80 Z" />
    <path class="raindrop" d="M60 90 Q65 95 70 90 T80 100 Q75 105 70 100 T60 90 Z" />
    <path class="raindrop" d="M30 90 Q35 95 40 90 T50 100 Q45 105 40 100 T30 90 Z" />

    <defs>
      <!-- 定义云的渐变 -->
      <radialGradient id="cloudGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stop-color="#f0f0f0" />
        <stop offset="100%" stop-color="#d0d0d0" />
      </radialGradient>
      <!-- 定义云的阴影 -->
      <filter id="cloudShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.3)" />
      </filter>
    </defs>
  </svg>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
svg {
  width: 1em;
  height: 1em;
}

/* 定义雨滴的动画 */
@keyframes fall {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(50px);
    opacity: 0;
  }
}

/* 雨滴样式 */
.raindrop {
  fill: skyblue;
  animation: fall 1s linear infinite;
}

/* 每个雨滴的延迟时间 */
.raindrop:nth-child(1) {
  animation-delay: 0s;
}
.raindrop:nth-child(2) {
  animation-delay: 0.2s;
}
.raindrop:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
