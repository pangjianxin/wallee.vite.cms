<template>
  <i :class="'ri-' + props.name"></i>
</template>

<script lang="ts" setup>
let props = defineProps({
  name: {
    type: String,
    require: true,
  },
});
</script>
