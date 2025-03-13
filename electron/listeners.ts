import { ipcMain, BrowserWindow } from "electron";
import { checkForUpdates, downloadUpdate, quitAndInstall } from "./update";

ipcMain.on("minimize", () => {
  const win = BrowserWindow.getFocusedWindow();
  win?.minimize();
});

ipcMain.on("destroy", () => {
  const win = BrowserWindow.getFocusedWindow();
  win?.destroy();
});

// 检查更新
ipcMain.on("checkForUpdates", checkForUpdates);

// 下载更新应用
ipcMain.on("downloadUpdate", downloadUpdate);

// 退出并安装更新
ipcMain.on("quitAndInstall", quitAndInstall);
