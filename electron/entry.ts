/**
 * electron entry
 */

import path from "path";
import { app, BrowserWindow } from "electron";
import "./tray";

const init = () => {
  const win = new BrowserWindow({
    icon: path.join(__dirname, "../../public/favicon.ico"),
    width: 1000,
    height: 700,
    frame: false,
    transparent: true,
    autoHideMenuBar: true,
    webPreferences: {
      webSecurity: false,
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      preload: path.join(__dirname, "preload"),
    },
  });

  win.once("ready-to-show", win.show);

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../", "index.html"));
  } else {
    win.loadURL(process.env.VITE_DEV_SERVER_URL || "");
  }
};

app.whenReady().then(init);
