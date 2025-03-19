<template>
  <div class="task">
    <h1>待办</h1>
    <ul v-if="tasksProcess.length">
      <li v-for="item in tasksProcess">
        <div class="title">{{ item.title }}</div>
        <pre class="content">{{ item.content }}</pre>
        <div class="time">{{ fmtDate(item.ctime) }}</div>
      </li>
    </ul>
    <el-empty v-else></el-empty>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { computed } from 'vue';
import { useTaskStore } from '@/pinia/task';

const taskStore = useTaskStore();

const tasksProcess = computed(() => taskStore.gTasksProcess);

const fmtDate = (date: Date) => moment(date).format('yyyy-MM-DD HH:mm:ss');
</script>

<style lang="scss" scoped>
.task {
  @include app-panel;
  height: 100%;
  padding: 1.5vw;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 2vw;
    margin-bottom: 1vw;
  }

  ul {
    list-style: disc;
    padding-left: 2vw;
    flex-grow: 1;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 1px;
    }

    li {
      margin-bottom: 1vw;
      .title {
        font-size: 1.5vw;
        font-weight: bold;
        margin-bottom: 0.6vw;
      }
      .content {
        font-size: 1.2vw;
        color: rgba(255, 255, 255, 0.6);
        word-break: break-all;
        white-space: pre-wrap;
        margin-bottom: 0.6vw;
      }
      .time {
        font-size: 1.2vw;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
}
</style>
