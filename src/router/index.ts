import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

// home|config|about|filemanage|note|userinfo|notice|

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Root",
    redirect: { name: "Home" },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/home/Home.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/config",
    name: "Config",
    component: () => import("../views/Config.vue"),
    meta: {
      title: "设置",
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: {
      title: "关于",
    },
  },
  {
    path: "/weather",
    name: "Weather",
    component: () => import("../views/Weather.vue"),
    meta: {
      title: "天气",
    },
  },
  {
    path: "/setup",
    name: "Setup",
    component: () => import("../views/Setup.vue"),
    meta: {
      title: "设置",
    },
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: () => import("../views/Tasks.vue"),
    meta: {
      title: "任务",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("../views/NotFound.vue"),
    meta: {
      title: "NotFound",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
