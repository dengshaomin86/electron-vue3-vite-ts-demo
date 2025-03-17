<template>
  <el-row v-if="inline" v-bind="$attrs">
    <slot></slot>
  </el-row>
  <template v-else>
    <slot></slot>
  </template>
</template>

<script setup lang="ts">
interface Props {
  inline: boolean | undefined;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped></style>
