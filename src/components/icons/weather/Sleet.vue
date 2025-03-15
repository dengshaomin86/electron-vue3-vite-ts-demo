<!-- 雨夹雪 -->
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

    <!-- 雨滴 -->
    <path class="raindrop" d="M40 60 Q45 65 50 60 T60 70 Q55 75 50 70 T40 60 Z" />
    <path class="raindrop" d="M60 70 Q65 75 70 70 T80 80 Q75 85 70 80 T60 70 Z" />
    <path class="raindrop" d="M30 70 Q35 75 40 70 T50 80 Q45 85 40 80 T30 70 Z" />

    <!-- 雪花 -->
    <path class="snowflake" d="M50 90 L55 95 L50 100 L45 95 Z" />
    <path class="snowflake" d="M70 90 L75 95 L70 100 L65 95 Z" />
    <path class="snowflake" d="M30 90 L35 95 L30 100 L25 95 Z" />
  </svg>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
svg {
  width: 1em;
  height: 1em;
}

/* 定义雨滴和雪花下落的动画 */
@keyframes fall {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100px);
    opacity: 0;
  }
}

/* 雨滴样式 */
.raindrop {
  fill: #00f;
  animation: fall 1s linear infinite;
}

/* 雪花样式 */
.snowflake {
  fill: #fff;
  stroke: #87ceeb;
  stroke-width: 1;
  animation: fall 2s linear infinite;
}

/* 每个雨滴和雪花的延迟时间 */
.raindrop:nth-child(1),
.snowflake:nth-child(1) {
  animation-delay: 0s;
}
.raindrop:nth-child(2),
.snowflake:nth-child(2) {
  animation-delay: 0.2s;
}
.raindrop:nth-child(3),
.snowflake:nth-child(3) {
  animation-delay: 0.4s;
}
.raindrop:nth-child(4),
.snowflake:nth-child(4) {
  animation-delay: 0.6s;
}
.raindrop:nth-child(5),
.snowflake:nth-child(5) {
  animation-delay: 0.8s;
}
</style>
