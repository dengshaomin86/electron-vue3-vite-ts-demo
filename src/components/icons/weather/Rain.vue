<!-- 雨 -->
<template>
  <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
    <!-- <rect width="150" height="150" fill="#e0f7fa" /> -->
    <!-- 云 -->
    <ellipse cx="90" cy="40" rx="35" ry="25" fill="url(#cloudGradient)" filter="url(#cloudShadow)" />
    <ellipse cx="50" cy="40" rx="35" ry="25" fill="url(#cloudGradient)" filter="url(#cloudShadow)" />
    <ellipse cx="70" cy="30" rx="35" ry="25" fill="url(#cloudGradient)" filter="url(#cloudShadow)" />

    <use v-for="item in drops" href="#raindrop" :x="item.x" :y="item.y" :width="item.width" :height="item.width" class="raindrop" />

    <!-- 雨滴 -->
    <symbol id="raindrop" viewBox="0 0 400 400">
      <path d="M80 130 A160 160, 0, 1, 0, 320 130L200 0Z" fill="#72b5fc" />
    </symbol>

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

<script setup lang="ts">
import { computed } from 'vue';

interface DropItem {
  x: number;
  y: number;
  width: number;
}

interface Props {
  type?: 'small' | 'middle' | 'large';
}

const VIEW_WIDTH = 150;

enum DropNum {
  small = 2,
  middle = 3,
  large = 4,
}

const props = withDefaults(defineProps<Props>(), {
  type: 'middle',
});

const drops = computed(() => {
  const dropNum = DropNum[props.type];
  return getListByNum(dropNum);
});

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getListByNum = (num: number) => {
  const gap = 5;
  const width = 15;
  let list: DropItem[] = [];
  let wt = width * num + (num - 1) * gap;
  let x = Math.floor((VIEW_WIDTH - wt) / 2);
  for (let i = 0; i < num; i++) {
    x = i ? x + gap + width : x;
    list.push({ width, x, y: 50 });
  }
  return list;
};
</script>

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
.raindrop:nth-of-type(1) {
  animation-delay: 0s;
}
.raindrop:nth-of-type(2) {
  animation-delay: 0.2s;
}
.raindrop:nth-of-type(3) {
  animation-delay: 0.4s;
}
.raindrop:nth-of-type(3) {
  animation-delay: 0.6s;
}
</style>
