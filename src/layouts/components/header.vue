<template>
  <div class="header-wrapper">
    <el-row justify="center" style="width: 100%">
      <el-col :lg="16" :sm="24" class="header-logo">
        <el-image class="header-img" :src="header"> </el-image>
        <div class="hader-action">
          <el-button type="danger" icon="Avatar" plain>企业登录</el-button>
          <el-button type="success" icon="Menu" plain>企业注册</el-button>
        </div>
      </el-col>
    </el-row>
    <menu-horizontal />
  </div>
</template>

<script setup lang="ts">
import useThemeStore from "/@/store/modules/useThemeStore";
import menuHorizontal from "/@/layouts/components/menu/menuHorizontal.vue";
import header from "/@/assets/img/header.png";
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
    justify-content: space-between;
    padding: var(--ba-main-space) var(--ba-main-space);
    margin-bottom: 0;
    .header-img {
      height: 8vmin;
      margin-right: 2vmin;
      user-select: none;
    }
    .header-action {
      display: flex;
      justify-content: end;
      align-items: center;
    }
  }
}
</style>
