<template>
  <div>
    <h1>About</h1>
    <div>version: {{ version }}</div>
    <el-button @click="checkForUpdates">checkForUpdates</el-button>
    <div>{{ process }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ipcRenderer } from "electron";
import { app } from "@electron/remote";
import { ElMessage } from "element-plus";
import { checkForUpdates } from "@/utils/ipcRenderer";

const version = app.getVersion();

const process = ref(0);

const updateProgressBar = (data: any) => {
  console.log("***updateProgressBar", data);
  process.value = data;
};

// 监听更新可用
ipcRenderer.on("update-available", (_e, { version, releaseDate }) => {
  const confirm = window.confirm(`发现新版本 ${version}，是否下载？${releaseDate}`);
  confirm && ipcRenderer.send("downloadUpdate");
});

// 可以在这里显示下载进度条
ipcRenderer.on("download-progress", (_e, progress: { percent: any; bytesPerSecond: any }) => {
  console.log(progress);
  updateProgressBar(progress.percent);
});

// 监听下载完成
ipcRenderer.on("update-downloaded", () => {
  const confirm = window.confirm("下载完成，是否立即安装？");
  confirm && ipcRenderer.send("quitAndInstall");
});

// 监听下载完成
ipcRenderer.on("update-error", (_e, msg: string) => {
  ElMessage.error({ grouping: true, message: msg });
});
</script>

<style lang="scss" scoped></style>
