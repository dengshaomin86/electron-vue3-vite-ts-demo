/**
 * 常量
 */

import path from 'path';
import { ipcRenderer } from 'electron';
import { app } from '@electron/remote';

export const DOC_DIR = <string>ipcRenderer.sendSync('docdir');
export const CACHES_DIR = <string>ipcRenderer.sendSync('cachesdir');
export const DOWNLOADS_DIR = <string>ipcRenderer.sendSync('downloadsdir');
export const LOGS_DIR = path.join(CACHES_DIR, 'logs');
export const APP_NAME = app.getName();
