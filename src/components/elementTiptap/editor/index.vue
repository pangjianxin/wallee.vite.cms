<template>
  <div class="editor" v-if="editor">
    <menu-bar class="editor__header" :editor="editor" />
    <editor-content class="editor__content" :editor="editor" />
    <div class="editor__footer">
      <span class="character-count">
        <i class="ri-calculator-line">当前已输入</i>:{{
          editor.storage.characterCount.characters()
        }}
      </span>
      <span>
        <slot name="action"></slot>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import CharacterCount from "@tiptap/extension-character-count";
import TextAlign from "@tiptap/extension-text-align";
import { Editor, EditorContent, useEditor } from "@tiptap/vue-3";
import { onMounted, ref } from "vue";
import MenuBar from "/@/components/elementTiptap/menuBar/index.vue";
import useThemeStore from "/@/store/modules/useThemeStore";

let theme = useThemeStore();

let editor = ref<Editor>();

let props = defineProps(["content"]);

let emit = defineEmits(["update:content"]);

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
      }),
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    content: props.content,
    onUpdate: ({ editor }) => {
      emit("update:content", editor.getHTML());
    },
  });
});
</script>
<style lang="scss">
@import "/@/components/elementTiptap/styles/tiptap.scss";
</style>
<style lang="scss" scoped>
.editor {
  display: flex;
  flex-direction: column;
  height: v-bind("theme.layout.elMainHeight - 10 + 'vh'");
  color: #0d0d0d;
  background-color: #fff;
  border: 1px solid #0d0d0d;
  border-radius: 0.75rem;
  width: 100%;

  &__header {
    display: flex;
    align-items: center;
    background-color: #409eff;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
    border-top-right-radius: 0.75rem;
    border-top-left-radius: 0.75rem;
    border-bottom: 1px solid #0d0d0d;
  }

  &__content {
    padding: 1.25rem 1rem;
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  &__footer {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    white-space: nowrap;
    border-top: 1px solid #0d0d0d;
    font-size: 12px;
    font-weight: 600;
    color: #0d0d0d;
    white-space: nowrap;
    padding: 0.25rem 0.75rem;

    .character-count {
      color: #868e96;
    }
  }
}
</style>
