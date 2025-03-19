<template>
  <div class="wrapper">
    <h1>设置</h1>
    <main>
      <ExtForm :model="formdata" :items="items"></ExtForm>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import ExtForm, { FormItem } from '@/components/ExtForm.vue';
import { useConfigStore } from '@/pinia/config';

const configStore = useConfigStore();

const formdata = reactive({});

const setupData = computed(() => configStore.gSetup);

const items = computed<FormItem[]>(() => {
  return [
    {
      prop: '',
      label: '开启切换动画',
      component: 'el-switch',
      attrs: {
        modelValue: setupData.value.transitionSwitch,
      },
      listeners: {
        change(val: boolean) {
          configStore.updateSetup('transitionSwitch', val);
        },
      },
    },
  ];
});
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 3vw;
  width: 100%;
  height: 100%;
  overflow: auto;

  h1 {
    font-size: 2.5vw;
    margin-bottom: 1vw;
  }
}
</style>
