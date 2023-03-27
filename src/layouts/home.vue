<template>
  <div>
    <component :is="layoutHorizontal" :key="route.path"></component>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import useThemeStore from "/@/store/modules/useThemeStore";
import layoutHorizontal from "/@/layouts/layoutHorizontal/index.vue";

const route = useRoute();
const theme = useThemeStore();
</script>

<style scoped></style>
