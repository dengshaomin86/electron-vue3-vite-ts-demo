/**
 * update
 */

import { app, BrowserWindow } from "electron";
import { autoUpdater } from "electron-updater";
import { logger } from "./logger";
import { FEED_URL } from "./config";

let win: BrowserWindow | null = null;

// 关闭自动下载
autoUpdater.autoDownload = false;
// 设置更新源
autoUpdater.setFeedURL({ provider: "generic", url: FEED_URL });

// 下载进度监听
autoUpdater.on("download-progress", (progress) => {
  win?.webContents.send("download-progress", {
    percent: progress.percent,
    bytesPerSecond: progress.bytesPerSecond,
  });
});

// 下载完成事件
autoUpdater.on("update-downloaded", () => {
  logger.info("更新包下载完成");
  win?.webContents.send("update-downloaded");
});

// 错误处理
autoUpdater.on("error", (error) => {
  win?.webContents.send("update-error", error.message);
});

export const checkForUpdates = async () => {
  try {
    win = BrowserWindow.getFocusedWindow();

    if (!app.isPackaged) {
      throw new Error("开发环境无法检查更新!");
    }

    const result = await autoUpdater.checkForUpdates();

    if (result?.updateInfo) {
      logger.info("发现新版本:", result.updateInfo.version);

      // 通过 IPC 通信通知渲染进程显示更新提示
      win?.webContents.send("update-available", {
        version: result.updateInfo.version,
        releaseDate: result.updateInfo.releaseDate,
      });
    }
  } catch (error) {
    logger.error("检查更新失败:", error);
    autoUpdater.emit("error", error);
  }
};

export const downloadUpdate = () => {
  autoUpdater.downloadUpdate();
};

export const quitAndInstall = () => {
  autoUpdater.quitAndInstall();
};
