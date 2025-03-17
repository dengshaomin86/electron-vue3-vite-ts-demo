import fs from "fs";
import path from "path";
import { ipcRenderer } from "electron";
import { cloneDeep } from "lodash";
import { ref } from "vue";
import type { PiniaPluginContext, Store } from "pinia";
import { CACHES_DIR } from "@/utils/constants";

const STORE_DIR = path.join(CACHES_DIR, "store");

const handleFilename = (id: string) => `${id}.as`;

const ensureFileSync = (dest: string) => {
  if (fs.existsSync(dest)) return;
  fs.mkdirSync(path.dirname(dest));
};

// 合并 store state
function mergeState(target: any, source: any) {
  for (const key in source) {
    if (!(key in target)) continue; // target 不存在 key，直接跳过
    target[key].toString() === "[object Object]" && source[key].toString() === "[object Object]"
      ? mergeState(target[key], source[key])
      : (target[key] = source[key]);
  }
  return target;
}

function initState(store: Store, persist = false) {
  const { $id } = store;
  if (!persist) return;
  const _dir = path.join(STORE_DIR, handleFilename($id));
  if (!fs.existsSync(_dir)) return;
  const content = fs.readFileSync(_dir, "utf8");
  if (!content) return;
  const state = mergeState(cloneDeep(store.$state), JSON.parse(content)) as { [key: string]: any };
  for (const key in state) {
    // @ts-ignore
    store.$state[key] = ref(state[key]);
  }
}

function writeState(store: Store, persist = false) {
  const { $id } = store;
  if (!persist) return;
  const dest = path.join(STORE_DIR, handleFilename($id));
  ensureFileSync(dest);
  fs.writeFileSync(dest, JSON.stringify(store.$state), "utf8");
}

export function piniaPluginSaveState(context: PiniaPluginContext) {
  const { store, options } = context;
  const { persist } = options;

  ipcRenderer.on("updateStoreState", () => initState(store, persist));

  initState(store, persist);

  // 响应 store 变化
  store.$subscribe(() => {
    writeState(store, persist);
  });
}
