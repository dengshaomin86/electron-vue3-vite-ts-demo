<template>
  <div class="app">
    <SideBar></SideBar>
    <div class="content">
      <Header></Header>
      <main>
        <router-view v-slot="{ Component }">
          <transition :name="configStore.gTransition" :style="configStore.gTransitionStyle">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import SideBar from './components/SideBar.vue';
import { useConfigStore } from '@/pinia/config';

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
    overflow: hidden;
    display: flex;
    flex-direction: column;

    main {
      flex: 1;
      height: 100%;
      overflow: auto;
      position: relative;
    }
  }
}

.scale-enter-active {
  transform-origin: 0 100px;
  background: var(--bg-color);
}
.scale-enter-active,
.scale-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.6s;
}

.scale-enter-from {
  transform: scale(0);
}

.scale-leave-to {
  opacity: 0;
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
