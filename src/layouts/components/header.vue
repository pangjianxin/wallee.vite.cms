<template>
  <div class="header-wrapper">
    <div class="header-logo">
      <el-image class="header-img" :src="logo"> </el-image>
      <div class="header-text">
        <div class="header-title">
          {{ appName }}
        </div>
        <div class="header-subtitle">
          {{ appEngName }}
        </div>
      </div>
    </div>
    <menu-horizontal />
  </div>
</template>

<script setup lang="ts">
import useThemeStore from "/@/store/modules/useThemeStore";
import menuHorizontal from "/@/layouts/components/menu/menuHorizontal.vue";
import logo from "/@/assets/img/logo_bg_w.png";
import { computed } from "vue";
const appName = import.meta.env["VITE_APP_NAME"];
const appEngName = import.meta.env["VITE_APP_ENG_NAME"];
const contactInfo = import.meta.env["VITE_CONTACT_INFO"];
const theme = useThemeStore();
</script>

<style lang="scss" scoped>
.header-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 95%;
  border-radius: 0.5vmin;
  background-color: v-bind('theme.getColorVal("baseBackground")');
  margin-top: var(--ba-main-space);
  .header-logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: var(--ba-main-space) var(--ba-main-space);
    margin-bottom: 0;
    .header-img {
      height: 8vmin;
      margin-right: 2vmin;
      user-select: none;
    }
    .header-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .header-title {
        font-size: 2rem;
        font-weight: 600;
        line-height: 30px;
        color: v-bind('theme.getColorVal("baseTextColor")');
      }
      .header-subtitle {
        padding-top: 6px;
        font-size: 1.25rem;
        font-weight: 600;
        color: v-bind('theme.getColorVal("baseTextColor")');
      }
    }
  }
}
</style>
