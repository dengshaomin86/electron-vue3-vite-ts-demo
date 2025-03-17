<template>
  <div class="task">
    <h1>待办</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
</script>

<style lang="scss" scoped>
.task {
  @include app-panel;
  height: 100%;
  padding: 1.5vw;

  h1 {
    font-size: 2vw;
  }
}
</style>
