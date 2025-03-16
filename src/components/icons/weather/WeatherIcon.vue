<template>
  <component :is="comp"></component>
</template>

<script setup lang="ts">
import { computed } from "vue";
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

interface Props {
  name: string | undefined;
}

const props = defineProps<Props>();

const comp = computed(() => {
  if (!props.name) return Overcast;
  if (/晴/.test(props.name)) return Fair;
  if (/雨/.test(props.name)) return Rain;
  if (/多云/.test(props.name)) return Cloudy;
  if (/雾/.test(props.name)) return Foggy;
  if (/霜冻/.test(props.name)) return Frosty;
  if (/冰雹/.test(props.name)) return Hail;
  if (/雨夹雪/.test(props.name)) return Sleet;
  if (/雪/.test(props.name)) return Snow;
  if (/雷/.test(props.name)) return Thundershower;
  return Overcast;
});
</script>

<style lang="scss" scoped></style>
