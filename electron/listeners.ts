import { ipcMain, BrowserWindow } from "electron";

ipcMain.on("minimize", () => {
  const win = BrowserWindow.getFocusedWindow();
  win?.minimize();
});

ipcMain.on("destroy", () => {
  const win = BrowserWindow.getFocusedWindow();
  win?.destroy();
});
