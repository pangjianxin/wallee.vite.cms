<template>
  <component :is="icon" width="16" height="16" v-bind="$attrs" />
</template>

<script lang="ts" setup>
import { defineAsyncComponent, computed } from "vue";

let props = defineProps({
  name: {
    type: String,
    require: true,
  },
});
const icon = computed(() => {
  return defineAsyncComponent(
    () => import(`./icons/${props.name}.svg`)
  );
});
</script>
