/**
 * utils
 */

import path from "path";
import { app } from "electron";

/**
 * 处理 app url
 * @param str
 * @returns
 */
export function handleAppUrl(str = "index.html") {
  return app.isPackaged ? path.join(__dirname, "../", str) : process.env.VITE_DEV_SERVER_URL + str;
}
