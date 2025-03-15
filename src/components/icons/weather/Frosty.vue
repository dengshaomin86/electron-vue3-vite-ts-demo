<!-- 霜冻 -->
<template>
  <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
    <!-- 背景 -->
    <!-- <rect width="150" height="150" fill="#e0f7fa" /> -->

    <!-- 冰晶 1 -->
    <path class="frost-crystal" d="M75 20 L85 40 L65 40 Z" />
    <path class="frost-crystal" d="M75 130 L85 110 L65 110 Z" />
    <path class="frost-crystal" d="M20 75 L40 85 L40 65 Z" />
    <path class="frost-crystal" d="M130 75 L110 85 L110 65 Z" />

    <!-- 冰晶 2 -->
    <path class="frost-crystal" d="M50 30 L70 30 L60 50 Z" />
    <path class="frost-crystal" d="M100 120 L80 120 L90 100 Z" />
    <path class="frost-crystal" d="M30 100 L30 80 L50 90 Z" />
    <path class="frost-crystal" d="M120 50 L120 70 L100 60 Z" />

    <!-- 霜花 -->
    <g class="frost-flower">
      <circle cx="75" cy="75" r="30" />
      <path d="M75 45 Q85 55 75 65 T65 75 Q75 85 85 75 T75 105 Q65 95 75 85 T85 75 Q75 65 65 75 T75 45 Z" />
    </g>
  </svg>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
svg {
  width: 1em;
  height: 1em;
}

/* 定义冰晶闪烁的动画 */
@keyframes frostSparkle {
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

/* 定义霜花旋转的动画 */
@keyframes frostRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 冰晶样式 */
.frost-crystal {
  fill: #e0f7fa;
  stroke: #80deea;
  stroke-width: 1;
  animation: frostSparkle 2s ease-in-out infinite;
}

/* 霜花样式 */
.frost-flower {
  fill: none;
  stroke: #80deea;
  stroke-width: 2;
  animation: frostRotate 10s linear infinite;
  transform-origin: center;
}
</style>
