<template>
  <div>
    <postViewer v-if="blogPost" :blog="blog" :blog-post="blogPost">
    </postViewer>
  </div>
</template>

<script setup lang="ts">
import { BlogPostService, BlogDto, BlogPostDto, BlogService, CmsClient, OpenAPI } from "/@/openapi/cms";
import postViewer from "/@/components/elementTiptap/viewer/index.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

let cmsClient = new CmsClient(OpenAPI);

const route = useRoute();
let blogPost = ref<BlogPostDto>();
let blog = ref<BlogDto>();

onMounted(async () => {
  await getBlogPost();
});

const getBlogPost = async () => {
  let postId = route.params["blogPostId"] as string;
  blogPost.value = await cmsClient.blogPost.blogPostGet({
    id: postId!,
  });
  blog.value = await cmsClient.blog.blogGet({
    id: blogPost.value?.blogId!,
  });
};
</script>

<style scoped></style>
<route lang="yaml">
name: blogPost.detail
meta: 
  title: 文章详情
  description: 文章详情
  visible: false
  keepAlive: true
  requiredAuth: false
</route>
