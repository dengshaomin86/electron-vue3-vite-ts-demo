<template>
  <div class="header">
    <div></div>
    <div class="r"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.header {
  height: 60px;
  width: 100%;
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
  .r {
    @include app-panel;
    width: 300px;
    border-radius: 0 0 0 100px;
  }
}
</style>
