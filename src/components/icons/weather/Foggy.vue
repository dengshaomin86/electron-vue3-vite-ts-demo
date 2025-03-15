<!-- 雾 -->
<template>
  <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
    <!-- 背景天空 -->
    <!-- <rect width="150" height="150" fill="#a9a9a9" /> -->

    <!-- 雾层 1 -->
    <ellipse class="fog fog-layer-1" cx="75" cy="50" rx="60" ry="20" />
    <ellipse class="fog fog-layer-1" cx="75" cy="80" rx="70" ry="25" />
    <ellipse class="fog fog-layer-1" cx="75" cy="110" rx="50" ry="15" />

    <!-- 雾层 2 -->
    <ellipse class="fog fog-layer-2" cx="75" cy="40" rx="50" ry="15" />
    <ellipse class="fog fog-layer-2" cx="75" cy="70" rx="60" ry="20" />
    <ellipse class="fog fog-layer-2" cx="75" cy="100" rx="70" ry="25" />

    <!-- 雾层 3 -->
    <ellipse class="fog fog-layer-3" cx="75" cy="60" rx="70" ry="25" />
    <ellipse class="fog fog-layer-3" cx="75" cy="90" rx="50" ry="15" />
    <ellipse class="fog fog-layer-3" cx="75" cy="120" rx="60" ry="20" />
  </svg>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
svg {
  width: 1em;
  height: 1em;
}

/* 定义雾的动画 */
@keyframes fogFloat {
  0% {
    transform: translateX(0);
    opacity: 0.8;
  }
  50% {
    transform: translateX(10px);
    opacity: 1;
  }
  100% {
    transform: translateX(0);
    opacity: 0.8;
  }
}

/* 雾的样式 */
.fog {
  fill: #d3d3d3;
  opacity: 0.8;
  animation: fogFloat 4s ease-in-out infinite;
}

/* 不同雾层的延迟时间 */
.fog-layer-1 {
  animation-delay: 0s;
}
.fog-layer-2 {
  animation-delay: 1s;
}
.fog-layer-3 {
  animation-delay: 2s;
}
</style>
