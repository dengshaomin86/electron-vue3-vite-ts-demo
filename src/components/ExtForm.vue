<template>
  <el-form ref="formRef" v-bind="$attrs" :model="model" :inline="inline">
    <ExtFormRow :inline="inline">
      <template v-for="item in itemsFilter" :key="item.prop">
        <ExtFormCol :span="item.span">
          <el-form-item :prop="item.prop" :label="item.label" :rules="item.rules">
            <slot v-if="item.slot" :name="item.slot" :data="model[item.prop]" :attrs="item.attrs" :listeners="item.listeners"></slot>
            <component v-else :is="item.component" v-model="model[item.prop]" v-bind="item.attrs || {}" v-on="item.listeners || {}"></component>
          </el-form-item>
        </ExtFormCol>
      </template>
    </ExtFormRow>
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { FormInstance, FormItemRule } from 'element-plus';
import ExtFormRow from './ExtFormRow.vue';
import ExtFormCol from './ExtFormCol.vue';

export interface FormItem {
  prop: string;
  label?: string;
  component?: any;
  slot?: string;
  rules?: FormItemRule[];
  visible?: boolean;
  attrs?: {
    [key: string]: any;
  };
  listeners?: {
    [key: string]: any;
  };
  span?: number;
  [key: string]: any;
}

interface Props {
  model: any;
  items: FormItem[];
  inline?: boolean;
}

const props = defineProps<Props>();

const formRef = ref<FormInstance>();

const itemsFilter = computed(() => props.items.filter((v) => v.visible !== false));

const validate = () => formRef.value!.validate;
const validateField = () => formRef.value!.validateField;

const resetFields = () => {
  formRef.value!.resetFields();
};

defineExpose({ validate, validateField, resetFields });
</script>

<style lang="scss" scoped>
.el-col {
  .el-form-item {
    width: calc(100% - 32px);
  }
}
</style>
