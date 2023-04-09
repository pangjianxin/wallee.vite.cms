<template>
  <el-page-header @back="onBack" style="margin-bottom: 1vh">
    <template #breadcrumb>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"> 首页 </el-breadcrumb-item>
        <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template #content>
      <div class="flx-center">
        <el-avatar :size="32" :src="logo" />
        <span class="text-large font-600 mr-3">&nbsp;{{ title }}&nbsp;</span>
        <el-tag>
          {{ description ?? dayjs(new Date()).format("YYYY/MM/DD") }}
        </el-tag>
      </div>
    </template>
    <template #extra>
      <slot name="action"></slot>
    </template>
  </el-page-header>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import logo from "/@/assets/img/api.png";
import dayjs from "dayjs";
let title = ref("");
let description = ref<string | null>();
let props = defineProps(["title", "description"]);
let router = useRouter();
let route = useRoute();
onMounted(() => {
  title.value = props.title ?? (route.meta.title as string);
  description.value = props.description ?? (route.meta.description as string);
});

function onBack() {
  router.back();
}
</script>
