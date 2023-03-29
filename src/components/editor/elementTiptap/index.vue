<template>
  <div>
    <div v-if="editor">
      <button
        @click="editor?.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        <icon :name="'bold'"></icon>
      </button>
      <button
        @click="editor?.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        <icon :name="'italic'"></icon>
      </button>
      <button
        @click="editor?.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        <icon :name="'strikethrough'"></icon>
      </button>
      <button
        @click="editor?.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
      >
        <icon :name="'code'"></icon>
      </button>
      <button @click="editor?.chain().focus().unsetAllMarks().run()">
        clear marks
      </button>
      <button @click="editor?.chain().focus().clearNodes().run()">
        clear nodes
      </button>
      <button
        @click="editor?.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }"
      >
        paragraph
      </button>
      <button
        @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        h1
      </button>
      <button
        @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        h2
      </button>
      <button
        @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        h3
      </button>
      <button
        @click="editor?.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      >
        h4
      </button>
      <button
        @click="editor?.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
      >
        h5
      </button>
      <button
        @click="editor?.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      >
        h6
      </button>
      <button
        @click="editor?.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        bullet list
      </button>
      <button
        @click="editor?.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        ordered list
      </button>
      <button
        @click="editor?.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
      >
        code block
      </button>
      <button
        @click="editor?.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }"
      >
        blockquote
      </button>
      <button @click="editor?.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </button>
      <button @click="editor?.chain().focus().setHardBreak().run()">
        hard break
      </button>
      <button
        @click="editor?.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
      >
        undo
      </button>
      <button
        @click="editor?.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
      >
        redo
      </button>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";
import icon from "/@/components/editor/icon/index.vue";
import { onMounted, onBeforeUnmount, ref, computed } from "vue";
let editor = ref<Editor>();
let props = defineProps({
  content: {
    type: String,
    require: true,
    default: "请输入内容进行编辑",
  },
});
let emit = defineEmits(["update:content"]);

onMounted(() => {
  editor.value = new Editor({
    extensions: [StarterKit],
    content: props.content,
    onUpdate: ({ editor }) => {
      emit("update:content", editor.getHTML());
    },
  });
  console.log(actions.value);
});

let actions = computed(() => {
  const extensionsManager = editor.value?.extensionManager;
  return extensionsManager?.extensions.reduce((acc, extension) => {
    const { button } = extension.options;
    console.log(button);
    if (!button || typeof button !== "function") return acc;
    const menuBtnComponentSpec = button({
      editor: editor.value,
      t: undefined,
      extension,
    });
    if (Array.isArray(menuBtnComponentSpec)) {
      return [...acc, ...menuBtnComponentSpec];
    }
    return [...acc, menuBtnComponentSpec];
  }, []);
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
}
</style>
