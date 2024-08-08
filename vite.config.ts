import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron/simple";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        entry: "electron/entry.ts", // 主进程文件
        vite: {
          build: {
            outDir: "dist/electron",
          },
        },
      },
      preload: {
        input: path.join(__dirname, "./electron/preload.ts"), // 预加载文件
        vite: {
          build: {
            outDir: "dist/electron",
          },
        },
      },
      renderer: {},
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
      // vue: 'vue/dist/vue.esm-bundler.js', // 运行时编译
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import '@/assets/styles/reset.scss';
        @import '@/assets/styles/theme.scss';
        @import '@/assets/styles/mixin.scss';
        `,
      },
    },
  },
});
