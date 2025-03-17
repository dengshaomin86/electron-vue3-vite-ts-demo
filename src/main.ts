import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "./assets/iconfont/iconfont.css";
import App from "./App.vue";
import router from "./router";
import { piniaPluginSaveState } from "./pinia/plugins/saveState";

const pinia = createPinia();
pinia.use(piniaPluginSaveState);

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

createApp(App)
  .use(router)
  .use(pinia)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .mount("#app");
