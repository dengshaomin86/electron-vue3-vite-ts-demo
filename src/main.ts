import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/reset.scss";

const pinia = createPinia();

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

createApp(App).use(router).use(pinia).mount("#app");
