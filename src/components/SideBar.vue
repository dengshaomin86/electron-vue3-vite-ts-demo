<template>
  <div class="side-bar">
    <div class="logo">
      <img src="/logo@512.png" alt="" />
      <div>simple</div>
    </div>
    <div class="content"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.side-bar {
  width: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;

  .logo {
    margin: 16px 0;

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
  }
}
</style>
