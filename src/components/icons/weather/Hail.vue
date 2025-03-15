<!-- 冰雹 -->
<template>
  <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
    <!-- 定义云的渐变 -->
    <defs>
      <radialGradient id="cloudGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stop-color="#f0f0f0" />
        <stop offset="100%" stop-color="#d0d0d0" />
      </radialGradient>
    </defs>

    <!-- 云 -->
    <ellipse cx="80" cy="40" rx="35" ry="25" fill="url(#cloudGradient)" filter="url(#cloudShadow)" />
    <ellipse cx="40" cy="40" rx="35" ry="25" fill="url(#cloudGradient)" filter="url(#cloudShadow)" />
    <ellipse cx="60" cy="30" rx="35" ry="25" fill="url(#cloudGradient)" filter="url(#cloudShadow)" />

    <!-- 冰雹 -->
    <circle class="hailstone" cx="50" cy="50" r="5" />
    <circle class="hailstone" cx="70" cy="50" r="5" />
    <circle class="hailstone" cx="40" cy="50" r="5" />
    <circle class="hailstone" cx="60" cy="50" r="5" />
    <circle class="hailstone" cx="80" cy="50" r="5" />
  </svg>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
svg {
  width: 1em;
  height: 1em;
}

/* 定义冰雹下落的动画 */
@keyframes hailFall {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100px);
    opacity: 0;
  }
}

/* 冰雹样式 */
.hailstone {
  fill: #b0e0e6;
  stroke: #87ceeb;
  stroke-width: 1;
  animation: hailFall 1s linear infinite;
}

/* 每个冰雹的延迟时间 */
.hailstone:nth-child(1) {
  animation-delay: 0s;
}
.hailstone:nth-child(2) {
  animation-delay: 0.2s;
}
.hailstone:nth-child(3) {
  animation-delay: 0.4s;
}
.hailstone:nth-child(4) {
  animation-delay: 0.6s;
}
.hailstone:nth-child(5) {
  animation-delay: 0.8s;
}
</style>
