<template>
  <div>
    <elementTiptap v-model:content="content"></elementTiptap>
    <el-button @click="log">log</el-button>
  </div>
</template>

<script setup lang="ts">
import elementTiptap from "/@/components/editor/elementTiptap/index.vue";
import { ref } from "vue";
let content = ref("hello world");
const log = () => {
  console.log(content.value);
};
</script>

<style scoped></style>
<route lang="yaml">
name: test
meta:
  title: 测试页面
  description: 测试页面
  icon: setting
  visible: true
</route>
