<!-- 阴 -->
<template>
  <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
    <!-- 云 -->
    <ellipse cx="90" cy="40" rx="35" ry="25" fill="url(#cloudGradient)" filter="url(#cloudShadow)" />
    <ellipse cx="50" cy="40" rx="35" ry="25" fill="url(#cloudGradient)" filter="url(#cloudShadow)" />
    <ellipse cx="70" cy="30" rx="35" ry="25" fill="url(#cloudGradient)" filter="url(#cloudShadow)" />

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
</style>
