import { reactive } from "vue";
import { defineStore } from "pinia";
import { STORE_THEME } from "/@/store/consts/cacheKey";
import type { Layout } from "/@/store/interfaces";
import { computed } from "vue";

export default defineStore(
  "appTheme",
  () => {
    const layout: Layout = reactive({
      layoutMode: "horizontal",
      // 是否暗黑模式
      isDark: false,
      // 最顶部系统标题栏设置
      baseBackground: ["#FFFFFF", "#F56C6C"],
      baseTextColor: ["#FFFFFF", "#FFFFFF"],
      elHeaderHeight: 13,
      elMainHeight: 86,
      /* 顶栏 */
      // 顶栏背景色
      navMenuBackground: ["#FFFFFF", "#FFFFFF"],
      // 顶栏悬停时背景色
      navMenuHoverBackground: ["#E5EAF3", "#18222c"],
      // 顶栏文字色/图标
      navMenuTabColor: ["#000000", "#CFD3DC"],
      // 顶栏激活项背景色
      navMenuTabActiveBackground: ["#ffffff", "#1d1e1f"],
      // 顶栏激活项文字色
      navMenuTabActiveColor: ["#000000", "#409EFF"],
    });

    let elHeaderHeight = computed(() => {
      return layout.elHeaderHeight + "vh";
    });

    let elMainHeight = computed(() => {
      return layout.elMainHeight + "vh";
    });

    function setLayoutMode(mode: "horizontal") {
      layout.layoutMode = mode;
    }

    function setLayoutColor(data: keyof Layout, value: string) {
      const index = layout.isDark === true ? 1 : 0;
      (layout[data] as string[])[index] = value;
    }

    function getColorVal(name: keyof Layout): string {
      const colors = layout[name] as string[];
      if (layout.isDark) {
        return colors[1];
      } else {
        return colors[0];
      }
    }

    return {
      layout,
      elHeaderHeight,
      elMainHeight,
      setLayoutColor,
      getColorVal,
      setLayoutMode,
    };
  },
  {
    persist: {
      key: STORE_THEME,
      //storage: window.sessionStorage,
    },
  }
);
