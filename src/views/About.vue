<template>
  <div class="wrapper">
    <main>
      <img src="/logo@512.png" />
      <div class="r">
        <div class="name">{{ name }}</div>
        <div class="version">
          <span>v{{ version }}</span>
          <el-button type="primary" link :loading="loading" @click="checkForUpdates">检查更新</el-button>
          <span v-if="loading">{{ Math.ceil(process) }}%&emsp;{{ formatterSize(bytesPerSecond) }}/s</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { ref } from 'vue';
import { ipcRenderer } from 'electron';
import { app } from '@electron/remote';
import { ElMessage } from 'element-plus';
import { formatterSize } from '@/utils';
import { checkForUpdates } from '@/utils/ipcRenderer';

const name = app.getName();
const version = app.getVersion();

const loading = ref<boolean>(false);
const process = ref<number>(0);
const bytesPerSecond = ref<number>(0);

// 监听更新可用
ipcRenderer.on('update-available', (_e, { version, releaseDate }) => {
  const confirm = window.confirm(`发现新版本 ${version}，发布时间${moment(releaseDate).format('yyyy-MM-DD HH:mm:ss')}，是否下载？`);
  confirm && ipcRenderer.send('downloadUpdate');
});

// 可以在这里显示下载进度条
ipcRenderer.on('download-progress', (_e, progress: { percent: number; bytesPerSecond: number }) => {
  loading.value = true;
  process.value = progress.percent;
  bytesPerSecond.value = progress.bytesPerSecond;
});

// 监听下载完成
ipcRenderer.on('update-downloaded', () => {
  loading.value = false;
  const confirm = window.confirm('下载完成，是否立即安装？');
  confirm && ipcRenderer.send('quitAndInstall');
});

// 监听下载完成
ipcRenderer.on('update-error', (_e, msg: string) => {
  loading.value = false;
  ElMessage.error({ grouping: true, message: msg });
});
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  main {
    margin-bottom: 10vw;
    display: flex;
    align-items: start;
    img {
      width: 8vw;
      margin-right: 1vw;
    }
    .name {
      font-size: 4vw;
      text-transform: uppercase;
      font-weight: bold;
    }
    .version {
      font-size: 1.5vw;
      display: flex;
      align-items: center;
      .el-button {
        margin-left: 1vw;
        font-size: inherit;
      }
    }
  }
}
</style>
