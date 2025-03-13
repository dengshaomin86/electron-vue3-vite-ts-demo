/**
 * 日志
 */

import path from "path";
import log from "electron-log";
import { BrowserWindow } from "electron";
import { CACHES_DIR } from "./constants";

export const logDevtools = (...arg: any) => {
  const wins = BrowserWindow.getAllWindows() || [];
  for (let win of wins.reverse()) {
    if (win.isVisible()) {
      win.webContents.send("logDevtools", ...arg);
      break;
    }
  }
};

/**
 * electron-log 配置
 */

// 关闭控制台打印
log.transports.console.level = false;
// 文件最大1MB
log.transports.file.maxSize = 1024 * 1024;
// 文件路径
log.transports.file.resolvePathFn = () => path.join(CACHES_DIR, "logs", "main.log");

export const logger = log;
