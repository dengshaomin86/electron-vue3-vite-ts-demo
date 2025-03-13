import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "./assets/iconfont/iconfont.css";
import App from "./App.vue";
import router from "./router";

const pinia = createPinia();

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

createApp(App)
  .use(router)
  .use(pinia)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .mount("#app");
