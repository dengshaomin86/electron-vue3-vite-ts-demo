<template>
  <div>
    <h1>Home</h1>
    <router-link to="about">about</router-link>
  </div>
</template>

<script setup lang="ts">
import fs from "fs";
import path from "path";

console.log(fs.readdirSync(path.join("d:/")));
</script>

<style lang="scss" scoped></style>
