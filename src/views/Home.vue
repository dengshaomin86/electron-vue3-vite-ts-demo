<template>
  <div class="wrapper">
    <section>
      <Statistics></Statistics>
      <div class="row">
        <Calendar></Calendar>
        <Weather></Weather>
      </div>
    </section>
    <section>
      <Task></Task>
    </section>
  </div>
</template>

<script setup lang="ts">
import fs from "fs";
import path from "path";
import Statistics from "@/components/Statistics.vue";
import Calendar from "@/components/Calendar.vue";
import Weather from "@/components/Weather.vue";
import Task from "@/components/Task.vue";

console.log(fs.readdirSync(path.join("d:/")));
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  padding: 16px;
  display: flex;
  section {
    height: 100%;
    &:first-of-type {
      margin-right: 16px;
      flex: 5;
      display: flex;
      flex-direction: column;
      .row {
        margin-top: 16px;
        display: flex;
        > div {
          flex: 1;
          height: 240px;
        }
        .calendar {
          margin-right: 16px;
        }
      }
      .statistics {
        flex: 1;
      }
    }
    &:last-of-type {
      flex: 3;
    }
  }
}
</style>
