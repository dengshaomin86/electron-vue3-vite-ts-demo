<template>
  <div class="statistics">
    <!-- <h1>统计</h1> -->
    <div id="main"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from "vue";
import * as echarts from "echarts";

const init = async () => {
  await nextTick();
  var chartDom = document.getElementById("main");
  var myChart = echarts.init(chartDom);
  var option;

  let base = +new Date(2022, 9, 3);
  let oneDay = 24 * 3600 * 1000;
  let date = [];
  let data = [Math.random() * 300];
  for (let i = 1; i < 200; i++) {
    var now = new Date((base += oneDay));
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"));
    data.push(Math.round(Math.random() * 20));
  }

  option = {
    tooltip: {
      trigger: "axis",
      position: function (pt: any) {
        return [pt[0], "10%"];
      },
    },
    title: {
      left: "center",
      text: "title",
      show: false,
    },
    grid: {
      top: 20,
      bottom: 20,
    },
    toolbox: {},
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: date,
      axisLabel: {
        fontSize: 10,
      },
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
      offset: 0,
      splitLine: {
        show: false,
      },
    },
    dataZoom: [
      {
        type: "inside",
        start: 90,
        end: 100,
      },
    ],
    series: [
      {
        name: "Finish task",
        type: "line",
        symbol: "none",
        sampling: "lttb",
        itemStyle: {
          color: "rgb(255, 70, 131)",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 158, 68)",
            },
            {
              offset: 1,
              color: "rgb(255, 70, 131)",
            },
          ]),
        },
        data: data,
      },
    ],
  };

  option && myChart.setOption(option);
};

onMounted(init);
</script>

<style lang="scss" scoped>
.statistics {
  @include app-panel;
  padding: 16px;
  display: flex;
  flex-direction: column;

  #main {
    flex: 1;
  }
}
</style>
