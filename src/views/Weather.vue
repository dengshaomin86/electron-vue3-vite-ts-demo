<template>
  <div>
    <h1>Weather</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useWeatherStore } from "@/pinia/weather";

const weatherStore = useWeatherStore();

const init = () => {
  weatherStore.getWeather();
};

onMounted(init);
</script>

<style lang="scss" scoped></style>
