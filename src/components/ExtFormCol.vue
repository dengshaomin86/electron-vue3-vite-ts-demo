<template>
  <el-col v-if="span" v-bind="$attrs" :span="span">
    <slot></slot>
  </el-col>
  <template v-else>
    <slot></slot>
  </template>
</template>

<script setup lang="ts">
interface Props {
  span: number | undefined;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped></style>
