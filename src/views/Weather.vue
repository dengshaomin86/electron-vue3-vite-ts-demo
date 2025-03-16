<template>
  <div class="wrapper">
    <h1>{{ gCityInfo?.city }}未来两周天气</h1>
    <main>
      <div class="list">
        <div class="list-item" v-for="item in gForecast">
          <div class="list-item-label">{{ item.week }}</div>
          <div class="list-item-label">{{ fmtData(item.ymd) }}</div>
          <WeatherIcon :name="item.type"></WeatherIcon>
          <div class="list-item-desc">{{ item.type }}</div>
          <div class="list-item-desc">{{ item.fx }}{{ item.fl }}</div>
        </div>
      </div>
      <canvas id="lineChart"></canvas>
    </main>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { onMounted, computed, watch } from "vue";
import { useWeatherStore } from "@/pinia/weather";
import WeatherIcon from "@/components/icons/weather/WeatherIcon.vue";

const weatherStore = useWeatherStore();

const gCityInfo = computed(() => weatherStore.gCityInfo);
const gForecast = computed(() => {
  return weatherStore.gForecast.map((v) => {
    const lowN = Number(v.low.replace(/.+?(\d+).+/, "$1"));
    const highN = Number(v.high.replace(/.+?(\d+).+/, "$1"));
    return { ...v, lowN, highN };
  });
});

const fmtData = (date: string) => moment(date).format("MM-DD");

const draw = async () => {
  if (!gForecast.value.length) return;

  // 获取 canvas 元素和上下文
  const canvas = <HTMLCanvasElement>document.getElementById("lineChart");
  if (!canvas) return;
  canvas.width = 900;
  canvas.height = 300;
  const ctx = canvas.getContext("2d")!;

  // 数据点
  const data = gForecast.value.map((v) => v.highN);
  // 数据点2
  const data_low = gForecast.value.map((v) => v.lowN);
  // 所有数据
  const data_all = [...data_low, ...data];

  // 画布边距
  const padding = 40;

  // 计算 X 和 Y 轴的比例
  const xScale = (canvas.width - padding * 2) / (data.length - 1);
  const yScale = (canvas.height - padding * 2) / (Math.max(...data_all) - Math.min(...data_all));

  // 绘制折线
  ctx.beginPath();
  ctx.moveTo(padding, canvas.height - padding - (data[0] - Math.min(...data_all)) * yScale); // 起点
  data.forEach((value, index) => {
    const x = padding + index * xScale;
    const y = canvas.height - padding - (value - Math.min(...data_all)) * yScale;
    ctx.lineTo(x, y);
  });
  ctx.strokeStyle = "orange";
  ctx.lineWidth = 2;
  ctx.stroke();

  // 绘制数据点并标注温度
  ctx.fillStyle = "orange";
  ctx.font = "14px Arial";
  ctx.textAlign = "center";
  data.forEach((value, index) => {
    const x = padding + index * xScale;
    const y = canvas.height - padding - (value - Math.min(...data_all)) * yScale;

    // 绘制数据点
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();

    // 在数据点上方标注温度
    ctx.fillText(`${value}℃`, x, y - 10);
  });

  // ******************** low **********************
  // 绘制折线
  ctx.beginPath();
  ctx.moveTo(padding, canvas.height - padding - (data_low[0] - Math.min(...data_all)) * yScale); // 起点
  data_low.forEach((value, index) => {
    const x = padding + index * xScale;
    const y = canvas.height - padding - (value - Math.min(...data_all)) * yScale;
    ctx.lineTo(x, y);
  });
  ctx.strokeStyle = "skyblue";
  ctx.lineWidth = 2;
  ctx.stroke();

  // 绘制数据点并标注温度
  ctx.fillStyle = "skyblue";
  ctx.font = "14px Arial";
  ctx.textAlign = "center";
  data_low.forEach((value, index) => {
    const x = padding + index * xScale;
    const y = canvas.height - padding - (value - Math.min(...data_all)) * yScale;

    // 绘制数据点
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();

    // 在数据点上方标注温度
    ctx.fillText(`${value}℃`, x, y - 10);
  });
};

const init = () => {
  weatherStore.getWeather();
};

watch(() => gForecast.value, draw);
onMounted(init);
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 16px;

  h1 {
    margin-bottom: 24px;
  }

  main {
    width: 900px;
    margin: auto;

    .list {
      display: flex;
      padding: 0 10px;
      &-item {
        flex: 1;
        text-align: center;
        &-label {
          font-size: 10px;
        }
        &-desc {
          font-size: 10px;
          opacity: 0.6;
        }
        .el-icon {
          font-size: 20px;
          margin-top: 4px;
          color: skyblue;
        }
        > svg {
          font-size: 30px;
          margin-top: 4px;
        }
      }
    }
  }
}
</style>
