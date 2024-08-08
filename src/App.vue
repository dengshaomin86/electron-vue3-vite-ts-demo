<template>
  <div class="app">
    <SideBar></SideBar>
    <div class="content">
      <Header></Header>
      <main>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
import SideBar from "./components/SideBar.vue";
import { useConfigStore } from "@/pinia/config";

const configStore = useConfigStore();

configStore.setTheme();
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
  color: var(--font-color);
  background: var(--bg-color);
  border-radius: inherit;
  overflow: hidden;
  display: flex;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    .side-bar {
      margin-right: 16px;
    }

    main {
      flex: 1;
      height: 100%;
    }
  }
}
</style>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: transparent;
}

#app {
  padding: 4px;
  background-color: #000;
  border-radius: 20px;
}
</style>
