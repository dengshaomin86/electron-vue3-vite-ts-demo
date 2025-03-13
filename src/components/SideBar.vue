<template>
  <div class="side-bar">
    <div class="logo">
      <img src="/logo@512.png" alt="" />
      <div>simple</div>
    </div>
    <div class="content">
      <template v-for="item in MENUS">
        <i :class="['iconfont', item.icon]" @click="routeTo(item)"></i>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

interface MenuItem {
  icon: string;
  routeName: string;
}

const MENUS: MenuItem[] = [
  {
    icon: "icon-i-home",
    routeName: "Home",
  },
  {
    icon: "icon-weather",
    routeName: "Weather",
  },
  {
    icon: "icon-sports",
    routeName: "Sports",
  },
  {
    icon: "icon-tasks",
    routeName: "Tasks",
  },
  {
    icon: "icon-about",
    routeName: "About",
  },
];

const router = useRouter();

const routeTo = (item: MenuItem) => {
  router.push({ name: item.routeName });
};
</script>

<style lang="scss" scoped>
.side-bar {
  width: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;

  .logo {
    margin: 16px 0;
    user-select: none;

    img {
      display: block;
      width: 30px;
      margin: auto;
    }

    div {
      text-transform: uppercase;
      transform: rotate(-90deg);
      font-weight: bold;
      padding: 28px 0;
    }
  }

  .content {
    @include app-panel;
    flex: 1;
    border-radius: 0 300px 200px 0;
    margin-bottom: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .iconfont {
      font-size: 26px;
      transition: 0.15s;
      &:not(:last-of-type) {
        margin-bottom: 80%;
      }
      &:hover {
        cursor: pointer;
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
