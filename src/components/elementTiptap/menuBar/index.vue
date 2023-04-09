<template>
  <div>
    <template v-for="(item, index) in items">
      <div class="divider" v-if="item.type === 'divider'" :key="`divider${index}`" />
      <menu-item v-else :key="index" :icon="(item.icon as string)" :title="(item.title as string)"
        :action="(item.action as Function)" :isActive="(item.isActive as Function)" />
    </template>
    <el-drawer v-model="mediaDrawer" :beforeClose="onBeforeMediaDrawerClose">
      <template #header>
        <span>通过点击或者拖拽图片进行上传</span>
      </template>
      <uploader id="blogPostMedia" :drag="true" entity-type="blogPost" @update:file="onFileUploaded"
        :upload-style="{ 'width': '100%' }">
      </uploader>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import MenuItem from "./menuItem.vue";
import { Editor } from "@tiptap/vue-3";
import { ref } from "vue";
import uploader from "/@/components/uploading/index.vue";
import { MediaDescriptorDto } from "/@/openapi";

let mediaDrawer = ref(false);

let props = defineProps({
  editor: {
    type: Editor,
    required: true,
  },
});
let items = [
  {
    icon: "bold",
    title: "加粗",
    action: () => props.editor.chain().focus().toggleBold().run(),
    isActive: () => props.editor.isActive("bold"),
  },
  {
    icon: "italic",
    title: "斜体",
    action: () => props.editor.chain().focus().toggleItalic().run(),
    isActive: () => props.editor.isActive("italic"),
  },
  {
    icon: "strikethrough",
    title: "删除线",
    action: () => props.editor.chain().focus().toggleStrike().run(),
    isActive: () => props.editor.isActive("strike"),
  },
  {
    icon: "code-view",
    title: "代码",
    action: () => props.editor.chain().focus().toggleCode().run(),
    isActive: () => props.editor.isActive("code"),
  },
  {
    type: "divider",
  },
  {
    icon: "h-1",
    title: "一级标题",
    action: () =>
      props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => props.editor.isActive("heading", { level: 1 }),
  },
  {
    icon: "h-2",
    title: "二级标题",
    action: () =>
      props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => props.editor.isActive("heading", { level: 2 }),
  },
  {
    icon: "h-3",
    title: "三级标题",
    action: () =>
      props.editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: () => props.editor.isActive("heading", { level: 3 }),
  },
  {
    icon: "paragraph",
    title: "段落",
    action: () => props.editor.chain().focus().setParagraph().run(),
    isActive: () => props.editor.isActive("paragraph"),
  },
  {
    icon: "list-unordered",
    title: "无序列表",
    action: () => props.editor.chain().focus().toggleBulletList().run(),
    isActive: () => props.editor.isActive("bulletList"),
  },
  {
    icon: "list-ordered",
    title: "有序列表",
    action: () => props.editor.chain().focus().toggleOrderedList().run(),
    isActive: () => props.editor.isActive("orderedList"),
  },
  {
    icon: "code-box-line",
    title: "代码块",
    action: () => props.editor.chain().focus().toggleCodeBlock().run(),
    isActive: () => props.editor.isActive("codeBlock"),
  },
  {
    type: "divider",
  },
  {
    icon: "double-quotes-l",
    title: "引用",
    action: () => props.editor.chain().focus().toggleBlockquote().run(),
    isActive: () => props.editor.isActive("blockquote"),
  },
  {
    icon: "separator",
    title: "横向分割线",
    action: () => props.editor.chain().focus().setHorizontalRule().run(),
  },
  {
    type: "divider",
  },
  {
    icon: "text-wrap",
    title: "段落内换行",
    action: () => props.editor.chain().focus().setHardBreak().run(),
  },
  {
    icon: "image-add-line",
    title: "插入图片",
    action: () => (mediaDrawer.value = true),
  },
  {
    icon: "format-clear",
    title: "清除格式",
    action: () =>
      props.editor.chain().focus().clearNodes().unsetAllMarks().run(),
  },
  {
    type: "divider",
  },
  {
    icon: "align-left",
    title: "左对齐",
    action: () => props.editor.chain().focus().setTextAlign("left").run(),
  },
  {
    icon: "align-center",
    title: "居中对齐",
    action: () => props.editor.chain().focus().setTextAlign("center").run(),
  },
  {
    icon: "align-right",
    title: "右对齐",
    action: () => props.editor.chain().focus().setTextAlign("right").run(),
  },
];

const onFileUploaded = (file: MediaDescriptorDto) => {
  props.editor
    .chain()
    .focus()
    .setImage({
      src: import.meta.env["VITE_API_URL"] + "/api/cms/media/" + file.id,
    })
    .run();
};

const onBeforeMediaDrawerClose = () => {
  mediaDrawer.value = false;
};
</script>

<style lang="scss">
.divider {
  width: 1px;
  height: 1.25rem;
  background-color: rgba(#000, 0.1);
  margin-left: 0.5rem;
  margin-right: 0.75rem;
}
</style>
