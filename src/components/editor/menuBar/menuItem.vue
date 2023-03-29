<template>
  <button
    class="menu-item"
    :class="{ 'is-active': isActive ? isActive() : null }"
    @click="props.action"
    :title="title"
  >
    <icon :name="props.icon"></icon>
  </button>
</template>

<script lang="ts" setup>
import icon from "/@/components/editor/icon/index.vue";

let props = defineProps({
  icon: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  action: {
    type: Function,
    required: true,
  },

  isActive: {
    type: Function,
    default: null,
  },
});
</script>

<style lang="scss">
.menu-item {
  width: 1.85rem;
  height: 1.75rem;
  color: #0d0d0d;
  border: none;
  background-color: transparent;
  border-radius: 0.4rem;
  padding: 0.25rem;
  margin-right: 0.25rem;

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  &.is-active,
  &:hover {
    color: #fff;
    background-color: #222222;
  }
}
</style>
