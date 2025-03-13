<template>
  <div>
    <h1>About</h1>
    <div>version: {{ version }}</div>
  </div>
</template>

<script setup lang="ts">
import { app } from "@electron/remote";

const version = app.getVersion();
</script>

<style lang="scss" scoped></style>
