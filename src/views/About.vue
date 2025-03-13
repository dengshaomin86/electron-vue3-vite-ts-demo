<template>
  <div class="wrapper">
    <h1>{{ name }}</h1>
    <div class="version">
      <span>version: {{ version }}</span>
      <el-button type="primary" link :loading="loading" @click="checkForUpdates">检查更新</el-button>
      <span v-if="loading">{{ Math.ceil(process) }}%&emsp;{{ formatterSize(bytesPerSecond) }}/s</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ipcRenderer } from "electron";
import { app } from "@electron/remote";
import { ElMessage } from "element-plus";
import { formatterSize } from "@/utils";
import { checkForUpdates } from "@/utils/ipcRenderer";

const name = app.getName();
const version = app.getVersion();

const loading = ref<boolean>(false);
const process = ref<number>(0);
const bytesPerSecond = ref<number>(0);

// 监听更新可用
ipcRenderer.on("update-available", (_e, { version, releaseDate }) => {
  const confirm = window.confirm(`发现新版本 ${version}，是否下载？${releaseDate}`);
  confirm && ipcRenderer.send("downloadUpdate");
});

// 可以在这里显示下载进度条
ipcRenderer.on("download-progress", (_e, progress: { percent: number; bytesPerSecond: number }) => {
  loading.value = true;
  process.value = progress.percent;
  bytesPerSecond.value = progress.bytesPerSecond;
});

// 监听下载完成
ipcRenderer.on("update-downloaded", () => {
  loading.value = false;
  const confirm = window.confirm("下载完成，是否立即安装？");
  confirm && ipcRenderer.send("quitAndInstall");
});

// 监听下载完成
ipcRenderer.on("update-error", (_e, msg: string) => {
  loading.value = false;
  ElMessage.error({ grouping: true, message: msg });
});
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 24px;

  .version {
    font-size: 14px;
    margin-top: 4px;
    display: flex;
    align-items: center;

    .el-button {
      margin: 0 8px;
    }
  }
}
</style>
