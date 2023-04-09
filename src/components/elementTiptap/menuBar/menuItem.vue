<template>
  <button
    class="menu-item"
    :class="{ 'is-active': isActive ? isActive() : null }"
    @click.prevent="props.action"
    :title="title"
  >
    <icon :name="props.icon"></icon>
  </button>
</template>

<script lang="ts" setup>
import icon from "/@/components/elementTiptap/icon/index.vue";

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

<style lang="scss" scoped>
.menu-item {
  width: 1.85rem;
  height: 1.75rem;
  color: #0d0d0d;
  border: none;
  background-color: transparent;
  border-radius: 0.4rem;
  padding: 0.25rem;
  margin-right: 0.25rem;
  &.is-active,
  &:hover {
    color: #fff;
    background-color: #141414;
  }
}
</style>
