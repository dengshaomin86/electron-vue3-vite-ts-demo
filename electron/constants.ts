/**
 * 常量
 */

import os from "os";
import path from "path";
import { app } from "electron";

// 应用名称
export const APP_NAME = `${app.name}${app.isPackaged ? "" : "-dev"}`;

// 文档路径
export const DOC_DIR = path.join(os.homedir(), "Documents");

// 缓存路径
export const CACHES_DIR = path.join(DOC_DIR, app.name, "caches");

// 下载路径
export const DOWNLOADS_DIR = path.join(DOC_DIR, app.name, "downloads");
