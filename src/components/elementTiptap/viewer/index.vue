<template>
  <el-row justify="center">
    <el-col>
      <div class="post-image-container" v-if="coverImageMediaDownloadUrl">
        <img :src="coverImageMediaDownloadUrl" class="post-image" />
      </div>
      <div class="post-content">
        <el-row>
          <el-col :span="18" class="post-infos">
            <div class="post-info">
              <el-avatar icon="UserFilled" :size="36"> </el-avatar>
              <span>&nbsp; {{ blog?.name }} &nbsp;|&nbsp; </span>
              <span class="post-info-date">
                发布于:
                {{ dayjs(blogPost?.creationTime).format("YYYY年MM月DD日") }}
              </span>
            </div>
          </el-col>
          <el-col :span="6" class="flx-end">
            <el-button type="default" plain icon="Share"></el-button>
            <el-button type="default" plain icon="Printer"></el-button>
          </el-col>
        </el-row>
        <el-row justify="center" style="margin-top: 3vh">
          <h2>{{ blogPost?.title }}</h2>
        </el-row>
        <editor-content class="editor__content" :editor="editor" />
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import CharacterCount from "@tiptap/extension-character-count";
import TextAlign from "@tiptap/extension-text-align";
import { Editor, EditorContent, objectIncludes } from "@tiptap/vue-3";
import { PropType, onMounted, ref, watch } from "vue";
import { BlogPostDto, BlogDto } from "/@/openapi/cms";
import dayjs from "dayjs";

let editor = ref<Editor>();

let coverImageMediaDownloadUrl = ref("");

let props = defineProps({
  blogPost: {
    type: Object as PropType<BlogPostDto>,
    require: true,
  },
  blog: {
    type: Object as PropType<BlogDto>,
    require: true,
  },
});

watch(
  () => props.blogPost?.coverImageMediaId,
  (newVal) => {
    if (newVal) {
      coverImageMediaDownloadUrl.value = `${import.meta.env["VITE_API_CMS_URL"]
        }/api/cms/media/${newVal}`;
    }
  },
  { immediate: true }
);

onMounted(async () => {
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
    editable: false,
    content: props.blogPost?.content!,
  });
});
</script>
<style lang="scss">
@import "/@/components/elementTiptap/styles/tiptap.scss";
</style>
<style lang="scss" scoped>
.post-image-container {
  width: 100%;
  height: auto;
  border-radius: 12px;
  position: relative;
  margin-bottom: 1vh;

  .post-image {
    display: block;
    width: 100%;
    height: auto;
    margin: 0 auto;
    border-radius: 12px;
  }
}

.post-content {
  width: 90%;
  position: relative;
  padding: 1vmin 1vmin 1vmin 1vmin;
  margin: 0 auto;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(11, 15, 33, 0.03);

  .post-infos {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .post-info {
      display: flex;
      align-items: center;
      justify-content: start;
      color: darkgray;

      .post-info-date {
        font-size: 0.8rem;
      }
    }
  }
}
</style>
