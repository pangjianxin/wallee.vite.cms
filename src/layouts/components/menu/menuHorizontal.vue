<template>
  <el-row>
    <el-menu
      mode="horizontal"
      :default-active="onRoutes"
      router
      background-color="transparent"
      :ellipsis="false"
    >
      <template v-for="item in menus">
        <el-menu-item v-if="!item.children?.length" :index="item.path">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <template #title>
            <span :style="{ color: theme.getColorVal('navMenuTabColor') }">{{
              item.title
            }}</span>
          </template>
        </el-menu-item>
        <el-sub-menu v-else :index="item.title ?? item.path">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span :style="{ color: theme.getColorVal('navMenuTabColor') }">
              {{ item.title }}
            </span>
          </template>
          <tree :items="item.children"></tree>
        </el-sub-menu>
      </template>
    </el-menu>
  </el-row>
</template>
<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { MenuItem } from "/#/menu";
import tree from "./tree.vue";
import useThemeStore from "/@/store/modules/useThemeStore";
import type { ElScrollbar } from "element-plus";
import generatedRoutes from "~pages";

const verticalMenusRef = ref<InstanceType<typeof ElScrollbar>>();

const route = useRoute();
const onRoutes = computed(() => {
  return route.path;
});

const theme = useThemeStore();

const menus: MenuItem[] = reactive<MenuItem[]>([]);

watchEffect(() => {
  generatedRoutes
    .filter((it) => it.meta?.visible === true)
    .sort(
      (prev, next) =>
        (prev.meta?.order as number) - (next.meta?.order as number)
    )
    .forEach((item, index) => {
      menus.push({
        icon: item.meta?.icon as string,
        path: item.path,
        title: item.meta?.title as string,
      });
    });
});
</script>

<style scoped lang="scss">
.el-menu--horizontal {
  border-bottom: none !important;
}
</style>
