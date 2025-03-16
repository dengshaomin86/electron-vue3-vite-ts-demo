<template>
  <div>
    <h1>Tasks</h1>
    <div>
      <Overcast />
      <Rain />
      <Fair />
      <Cloudy />
      <Foggy />
      <Frosty />
      <Hail />
      <Sleet />
      <Snow />
      <Thundershower />
      <Drop />
    </div>
  </div>
</template>

<script setup lang="ts">
import Overcast from "@/components/icons/weather/Overcast.vue";
import Rain from "@/components/icons/weather/Rain.vue";
import Fair from "@/components/icons/weather/Fair.vue";
import Cloudy from "@/components/icons/weather/Cloudy.vue";
import Foggy from "@/components/icons/weather/Foggy.vue";
import Frosty from "@/components/icons/weather/Frosty.vue";
import Hail from "@/components/icons/weather/Hail.vue";
import Sleet from "@/components/icons/weather/Sleet.vue";
import Snow from "@/components/icons/weather/Snow.vue";
import Thundershower from "@/components/icons/weather/Thundershower.vue";
import Drop from "@/components/icons/Drop.vue";
</script>

<style lang="scss" scoped>
svg {
  font-size: 100px;
}
</style>
