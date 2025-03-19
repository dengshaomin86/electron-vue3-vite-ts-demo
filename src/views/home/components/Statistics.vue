<template>
  <div class="statistics">
    <!-- <h1>统计</h1> -->
    <div id="main"></div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { onMounted, nextTick, computed } from 'vue';
import * as echarts from 'echarts';
import { useTaskStore } from '@/pinia/task';

const taskStore = useTaskStore();

const tasks = computed(() => taskStore.gTasks.filter((v) => v.status === 'finish'));

const fmtData = (date: Date | number) => moment(date).format('yyyy-MM-DD');

const mkDates = (date: number) => {
  let dates = [];
  const today = moment().endOf('day').valueOf();
  while (date < today) {
    dates.push(fmtData(date));
    date += 24 * 3600 * 1000;
  }
  return dates;
};

const handleTasks = () => {
  if (!tasks.value.length) return { dates: [], datas: [] };
  const minDate = Math.min(...tasks.value.map((v) => moment(v.ftime).valueOf()));
  const dates = mkDates(minDate);
  let obj: any = {};
  for (let date of dates) {
    obj[date] = 0;
  }
  for (let item of tasks.value) {
    const date = fmtData(item.ftime!);
    if (date in obj) {
      obj[date] += 1;
    }
  }
  const datas = Object.values(obj);
  return { dates, datas };
};

const init = async () => {
  await nextTick();
  const { dates, datas } = handleTasks();
  const myChart = echarts.init(document.getElementById('main'));
  const dataZoomStart = ((dates.length - 7) / dates.length) * 100;
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
      position: function (pt: any) {
        return [pt[0], '10%'];
      },
    },
    title: {
      left: 'center',
      text: 'title',
      show: false,
    },
    grid: {
      top: 20,
      bottom: 20,
      left: '5%',
      right: '3%',
    },
    toolbox: {},
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dates,
      axisLabel: {
        fontSize: 10,
        formatter: function (value: string) {
          return moment(value).format('MM-DD');
        },
      },
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      offset: 0,
      splitLine: {
        show: false,
      },
    },
    dataZoom: [
      {
        type: 'inside',
        start: dataZoomStart,
        end: 100,
      },
    ],
    series: [
      {
        name: '完成量',
        type: 'line',
        smooth: false,
        itemStyle: {
          color: 'rgb(255, 70, 131)',
        },
        data: datas,
      },
    ],
  });
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
