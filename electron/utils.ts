/**
 * 工具
 */

import fs from "fs-extra";
import path from "path";
import child_process from "child_process";
import { app } from "electron";

export const appName = `${app.name}${app.isPackaged ? "" : "-dev"}`;

// 随机id
export function createRandomId(pre = "id"): string {
  const str = Math.random().toString(36).slice(2);
  return `${pre}_${str}`;
}

// 处理下载文件名重复问题
export function handlerFileDest(dest: string): string {
  if (!fs.existsSync(dest)) return dest;
  let idx = 1;
  const { dir, name, ext } = path.parse(dest);
  let base = `${name}_${String(idx).padStart(2, "0")}${ext}`;
  let _dest = path.join(dir, base);
  while (fs.existsSync(_dest)) {
    idx += 1;
    base = `${name}_${String(idx).padStart(2, "0")}${ext}`;
    _dest = path.join(dir, base);
  }
  return _dest;
}

// 返回 icon 路径
export function getIcon(basename: string) {
  return path.join(app.getAppPath(), app.isPackaged ? "dist" : "public", basename);
}

/**
 * cmd 删除文件
 * @param dest
 * @returns
 */
export function rmdir(dest: string) {
  return new Promise<boolean>((resolve) => {
    if (!fs.existsSync(dest)) {
      resolve(true);
      return;
    }
    const workerProcess = child_process.exec(`rmdir /s/q "${dest}"`);
    // 打印正常的后台可执行程序输出
    workerProcess.stdout?.on("data", function (data) {
      console.log("stdout: " + data);
    });
    // 打印错误的后台可执行程序输出
    workerProcess.stderr?.on("data", function (data) {
      console.log("stderr: " + data);
    });
    // 退出之后的输出
    workerProcess.on("close", function (code) {
      console.log("out code: " + code);
      resolve(true);
    });
  });
}

// 合并文件
export function mergeGroupFiles(dir: string, dest: string) {
  if (!dir) return;
  const { root } = path.parse(dir);
  dest = handlerFileDest(dest);
  const output = handlerFileDest(path.join(dir, "output"));
  const cmd = `${root.replace(/\\/g, "")} && cd ${dir} && copy /b * ${path.basename(output)}`;
  const workerProcess = child_process.exec(cmd);
  // 打印正常的后台可执行程序输出
  workerProcess.stdout?.on("data", function (data) {
    console.log("stdout: " + data);
  });
  // 打印错误的后台可执行程序输出
  workerProcess.stderr?.on("data", function (data) {
    console.log("stderr: " + data);
  });
  // 退出之后的输出
  workerProcess.on("close", function (code) {
    console.log("out code: " + code);
    if (code === 0) {
      fs.moveSync(output, dest);
      // 删除文件
      rmdir(dir);
    }
  });
}

/**
 * 处理 app url
 * @param str
 * @returns
 */
export function handleAppUrl(str = "index.html") {
  return app.isPackaged ? path.join(__dirname, "../", str) : process.env.VITE_DEV_SERVER_URL + str;
}

/**
 * 拼接 query string
 * @param data
 * @returns
 */
export function joinQuery(data: { [key: string]: any }) {
  let arr: string[] = [];
  for (let key in data) {
    arr.push(`${key}=${encodeURIComponent(data[key])}`);
  }
  return arr.join("&");
}
