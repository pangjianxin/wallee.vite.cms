<template>
  <div>
    <pageHeader></pageHeader>
    <el-divider border-style="dashed"></el-divider>
    <el-row :gutter="10" justify="center">
      <el-col :lg="14">
        <el-input size="large" prefix-icon="Search" style="margin-bottom:10px" placeholder="请输入文章标题进行检索...">
          <template #append>
            <el-button type="primary" plain icon="Search"></el-button>
          </template>
        </el-input>
        <blogPosts v-if="postList" :blog-posts="postList"></blogPosts>
        <el-row justify="end">
          <pagination style="margin-top: 20px" :handle-size-change="handleSizeChange"
            :handle-current-change="handleCurrentChange" :pageable="pageable">
          </pagination>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {
  BlogService,
  BlogPostStatus,
  BlogDto,
  CmsClient,
  OpenAPI
} from "/@/openapi/cms";
import { onMounted, ref, watch } from "vue";
import pagination from "/@/components/table/components/pagination.vue";
import { useRoute } from "vue-router";
import pageHeader from "/@/components/pageHeader/index.vue";
import blogPosts from "/@/views/blogPosts/components/list.vue";
import useBlogPostList from "/@/hooks/useBlogPostList";
let cmsClient = new CmsClient(OpenAPI);
const route = useRoute();
let blog = ref<BlogDto>();
const {
  postList,
  pageable,
  filter,
  postStatus,
  blogId,
  getBlogPostList,
  handleCurrentChange,
  handleSizeChange,
} = useBlogPostList();

onMounted(async () => {
  blogId.value = route.params.blogId as string;

  if (blogId.value) {
    blog.value = await cmsClient.blog.blogGet({
      id: blogId.value,
    });
  }

  await getBlogPostList();
});

watch(
  () => filter.value,
  async (newVal, oldVal) => {
    if (newVal !== oldVal) {
      filter.value = newVal;
      await getBlogPostList();
    }
  }
);
</script>

<style lang="scss" scoped></style>
<route lang="yaml">
name: blogPost.blog.index
meta: 
  title: 文章列表
  description: 博客文章列表,你可以通过左侧过滤装置对文章进行过滤
  visible: false
  keepAlive: true
  requiredAuth: false
  icon: Share
</route>
