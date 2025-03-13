<template>
  <div class="header">
    <div></div>
    <div class="r">
      <div class="icons">
        <el-icon :size="12" @click="minimize"><SemiSelect /></el-icon>
        <el-icon :size="14" @click="destroy"><CloseBold /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CloseBold, SemiSelect } from "@element-plus/icons-vue";
import { minimize, destroy } from "@/utils/ipcRenderer";
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  width: 100%;
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
  .r {
    @include app-panel;
    width: 300px;
    border-radius: 0 0 0 100px;
    .icons {
      padding-right: 16px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .el-icon {
        @include nodrag;
        width: 20px;
        height: 20px;
        margin-left: 4px;
        &:hover {
          cursor: pointer;
          background-color: var(--hover-color);
        }
      }
    }
  }
}
</style>
