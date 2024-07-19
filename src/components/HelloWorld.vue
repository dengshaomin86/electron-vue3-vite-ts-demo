<template>
  <div>
    <h1>HelloWorld</h1>
    <h1>{{ msg }}</h1>
    <h1>{{ count }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<style lang="scss" scoped></style>
