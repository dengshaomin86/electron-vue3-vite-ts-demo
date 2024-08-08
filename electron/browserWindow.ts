/**
 * 创建窗口
 */

import path from "path";
import { app, BrowserWindow } from "electron";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import { initialize, enable, isInitialized } from "@electron/remote/main";
import { handleAppUrl } from "./utils";

/**
 * 创建窗口
 * @param url
 * @param opts
 * @returns
 */
export function createBrowserWindow(url: string = "", opts: any = {}, show = true) {
  const win = new BrowserWindow({
    icon: path.join(__dirname, "../../public/favicon.ico"), // 任务栏图标
    autoHideMenuBar: true,
    webPreferences: {
      webSecurity: false,
      contextIsolation: false,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload"),
    },
    ...opts,
  });

  if (show) {
    win.once("ready-to-show", win.show);
  }

  if (url) {
    win.loadURL(`${url}${/\?/.test(url) ? "&" : "?"}win_id=${win.id}`);
  } else {
    win[app.isPackaged ? "loadFile" : "loadURL"](handleAppUrl("index.html"));
  }

  // 必须在主进程中初始化，然后才能从渲染器中使用
  !isInitialized() && initialize();
  enable(win.webContents);

  installExtension(VUEJS_DEVTOOLS.id)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));

  return win;
}

/**
 * 创建子窗口
 * @param url
 * @param opts
 */
export function createSubBrowserWindow(url: string, opts: any = {}, show = true) {
  const win = createBrowserWindow(url, opts, show);
  show && win.maximize();
  return win;
}

/**
 * 创建倒计时窗口
 * @param url
 * @param opts
 */
export function createDowntimeBrowserWindow(url: string, opts: any = {}, show = true) {
  const win = createBrowserWindow(url, { width: 280, height: 300, ...opts }, show);
  win.setAlwaysOnTop(true, "screen-saver");
  return win;
}

/**
 * 应用获取焦点
 * @returns
 */
export function focusAppWin() {
  const wins = BrowserWindow.getAllWindows();
  if (!wins.length) {
    createBrowserWindow();
    return;
  }
  const win = wins.find((v) => v.isVisible()) || wins[0];
  if (/\#\/downloadList/.test(win.webContents.getURL())) {
    createBrowserWindow();
    return;
  }
  win.isVisible() ? win.focus() : win.show();
}

/**
 * 监听新增窗口
 * @param e
 * @param browserWindow
 */
export function browserWindowCreated(e: any, browserWindow: BrowserWindow) {
  const { webContents } = browserWindow;

  const title = browserWindow.getTitle();
  if (title === "maximize") {
    browserWindow.maximize();
  }

  webContents.once("did-finish-load", () => {
    // console.log(webContents.getURL());
    // 配置子窗口
    webContents.setWindowOpenHandler(({ url }) => {
      // return { action: 'deny' }; // 禁止打开窗口
      const filter = [/\/\/www.bilibili.com\//];

      if (filter.some((v) => v.test(url))) {
        return {
          action: "allow",
          outlivesOpener: true,
          overrideBrowserWindowOptions: {
            icon: path.join(__dirname, "../../public/favicon.ico"), // 任务栏图标
            title: "maximize",
            frame: true,
            fullscreenable: true,
            backgroundColor: "black",
            autoHideMenuBar: true,
            webPreferences: {
              webSecurity: false,
              contextIsolation: false,
              nodeIntegration: true,
              preload: path.join(__dirname, "preload"),
            },
          },
        };
      }
      return {
        action: "allow",
        outlivesOpener: true,
        overrideBrowserWindowOptions: {
          icon: path.join(__dirname, "../../public/favicon.ico"), // 任务栏图标
          title: "maximize",
          frame: true,
          fullscreenable: true,
          backgroundColor: "black",
          autoHideMenuBar: true,
        },
      };
    });
  });
}
