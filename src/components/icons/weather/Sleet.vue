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
    <ellipse cx="90" cy="40" rx="35" ry="25" fill="url(#cloudGradient)" filter="url(#cloudShadow)" />
    <ellipse cx="50" cy="40" rx="35" ry="25" fill="url(#cloudGradient)" filter="url(#cloudShadow)" />
    <ellipse cx="70" cy="30" rx="35" ry="25" fill="url(#cloudGradient)" filter="url(#cloudShadow)" />

    <!-- 雨滴 -->
    <use href="#raindrop" x="60" y="0" width="15" class="raindrop" />
    <use href="#raindrop" x="80" y="0" width="15" class="raindrop" />
    <use href="#raindrop" x="40" y="0" width="15" class="raindrop" />

    <!-- 雪花 -->
    <use href="#snow" x="60" y="0" width="15" class="snowflake" />
    <use href="#snow" x="90" y="0" width="15" class="snowflake" />
    <use href="#snow" x="30" y="0" width="15" class="snowflake" />

    <!-- 雨滴 -->
    <symbol id="raindrop" viewBox="0 0 400 400">
      <path d="M80 130 A160 160, 0, 1, 0, 320 130L200 0Z" fill="#72b5fc" />
    </symbol>
    <!-- 雪花 -->
    <symbol id="snow" viewBox="0 0 200 200">
      <path stroke="#fff" stroke-width="8" d="M100 0V200M25 25L175 175M25 175L175 25M0 100H200M75 1H125M75 199H125M1 75V125M199 75V125"></path>
    </symbol>
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
    transform: translateY(50px);
    opacity: 0;
  }
}

/* 雨滴样式 */
.raindrop {
  animation: fall 1s linear infinite;
}

/* 雪花样式 */
.snowflake {
  animation: fall 2s linear infinite;
}

/* 每个雨滴和雪花的延迟时间 */
.raindrop:nth-of-type(1),
.snowflake:nth-of-type(1) {
  animation-delay: 0s;
}
.raindrop:nth-of-type(2),
.snowflake:nth-of-type(2) {
  animation-delay: 0.2s;
}
.raindrop:nth-of-type(3),
.snowflake:nth-of-type(3) {
  animation-delay: 0.4s;
}
.raindrop:nth-of-type(4),
.snowflake:nth-of-type(4) {
  animation-delay: 0.6s;
}
.raindrop:nth-of-type(5),
.snowflake:nth-of-type(5) {
  animation-delay: 0.8s;
}
</style>
