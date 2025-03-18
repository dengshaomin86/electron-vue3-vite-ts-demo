<template>
  <div class="ext-pagination">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" @click="prev">
      <path d="M65 20L35 50L65 80"></path>
    </svg>
    <div class="ext-pagination-num">
      <input type="text" :value="pageNum" @input="onInput" @keydown.stop="onkeydown" />
      <div>/&nbsp;{{ totalPage }}</div>
    </div>
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" @click="next">
      <path d="M35 20L65 50L35 80"></path>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  pageNum: number;
  pageSize: number;
  total: number;
}

const props = defineProps<Props>();
const emits = defineEmits(["update:pageNum", "change"]);

const totalPage = computed<number>(() => {
  if (!props.pageSize || !props.total) return 0;
  return Math.ceil(props.total / props.pageSize);
});

const change = (val: number) => {
  emits("update:pageNum", val);
  emits("change");
};

const onkeydown = () => {};

const onInput = (e: any) => {
  let val = Number(e.target.value.replace(/\D/g, ""));
  if (val > totalPage.value) val = totalPage.value;
  if (val < 1) val = 1;
  e.target.value = val;
  if (val === props.pageNum) return;
  change(val);
};

const prev = () => {
  if (props.pageNum > 1) {
    change(props.pageNum - 1);
  }
};

const next = () => {
  if (props.pageNum < totalPage.value) {
    change(props.pageNum + 1);
  }
};
</script>

<style lang="scss" scoped>
.ext-pagination {
  float: right;
  display: flex;
  align-items: center;
  user-select: none;

  svg {
    width: 2vw;
    height: 2vw;
    stroke: #fff;
    stroke-width: 10;
    &:hover {
      cursor: pointer;
    }
  }

  &-num {
    margin: 0 1vw;
    display: flex;
    align-items: center;

    input {
      width: 4vw;
      height: 2vw;
      color: #fff;
      border: 1px solid #fff;
      border-width: 0 0 1px 0;
      outline: none;
      text-align: center;
      background-color: transparent;
      margin-right: 0.5vw;
      font-size: 1.5vw;
    }
    > div {
      font-size: 1.5vw;
    }
  }
}
</style>
