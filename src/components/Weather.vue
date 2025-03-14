<template>
  <div class="weather">
    <el-icon><MostlyCloudy /></el-icon>
    <div class="text">{{ city }}</div>
    <div class="text">{{ range }}，{{ today?.fx }}{{ today?.fl }}</div>
    <div class="list">
      <div class="list-item" v-for="item in list">
        <span class="list-item-label">{{ item.label }}</span>
        <span class="list-item-value">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { MostlyCloudy } from "@element-plus/icons-vue";
import { useWeatherStore } from "@/pinia/weather";

const weatherStore = useWeatherStore();

const gCityInfo = computed(() => weatherStore.gCityInfo);
const weatherData = computed(() => weatherStore.gWeatherData);
const city = computed<string>(() => `${gCityInfo.value?.parent}${gCityInfo.value?.city}`);
const today = computed(() => weatherData.value?.forecast[0]);
const range = computed(() => `${today.value?.type}${wd(today.value?.low)}~${wd(today.value?.high)}`);

const list = computed(() => {
  return [
    {
      label: "温度",
      value: weatherData.value?.wendu + "℃",
    },

    {
      label: "湿度",
      value: weatherData.value?.shidu,
    },
    {
      label: "PM2.5",
      value: weatherData.value?.pm25,
    },
    {
      label: "PM10",
      value: weatherData.value?.pm10,
    },
    {
      label: "空气质量",
      value: weatherData.value?.quality,
    },
  ];
});

const wd = (data: string | undefined) => data && data.replace(/.+?(\d+)/, "$1");

const init = () => {
  weatherStore.getWeather();
};

onMounted(init);
</script>

<style lang="scss" scoped>
.weather {
  @include app-panel;
  padding: 16px;

  .text {
    font-size: 12px;
    margin-bottom: 4px;
  }

  .el-icon {
    font-size: 60px;
    margin: 0 auto;
    display: block;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    &-item {
      flex: 50%;
      font-size: 12px;
      margin-bottom: 4px;
      &-label {
        opacity: 0.6;
        margin-right: 4px;
      }
    }
  }
}
</style>
