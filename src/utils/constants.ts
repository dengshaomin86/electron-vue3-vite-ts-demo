/**
 * 常量
 */

import path from "path";
import { ipcRenderer } from "electron";

export const DOC_DIR = <string>ipcRenderer.sendSync("docdir");
export const CACHES_DIR = <string>ipcRenderer.sendSync("cachesdir");
export const DOWNLOADS_DIR = <string>ipcRenderer.sendSync("downloadsdir");
export const LOGS_DIR = path.join(CACHES_DIR, "logs");
