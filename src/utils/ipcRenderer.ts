/**
 * ipcRenderer
 */

import { ipcRenderer } from "electron";

export const minimize = () => {
  ipcRenderer.send("minimize");
};

export const destroy = () => {
  ipcRenderer.send("destroy");
};

export const checkForUpdates = () => {
  ipcRenderer.send("checkForUpdates");
};
