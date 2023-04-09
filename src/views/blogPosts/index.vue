<template>
  <div>
    <pageHeader></pageHeader>
    <el-divider border-style="dashed"></el-divider>
    <el-row :gutter="10" justify="center">
      <el-col >
        <el-input prefix-icon="Search" style="margin-bottom:10px" placeholder="输入文章标题进行检索...">
          <template #append>
            <el-button type="primary" plain icon="Search"></el-button>
          </template>
        </el-input>
        <blogPosts v-if="postList" :blog-posts="postList" @update:file-deleted="onFileDeleted"></blogPosts>
        <el-row justify="end" style="margin-top: 20px">
          <pagination :pageable="pageable" :handle-size-change="handleSizeChange"
            :handle-current-change="handleCurrentChange">
          </pagination>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {
  BlogPostService,
  BlogPostStatus,
  BlogPostListDto,
  CmsClient,
  OpenAPI
} from "/@/openapi/cms";
import { onMounted, reactive, ref, watch } from "vue";
import pagination, {
  Pageable,
} from "/@/components/table/components/pagination.vue";
import pageHeader from "/@/components/pageHeader/index.vue";
import blogPosts from "/@/views/blogPosts/components/list.vue";

let cmsClient = new CmsClient(OpenAPI);

//分页数据
let postList = ref<BlogPostListDto[]>([]);
let filter = ref("");
let postStatus = ref<BlogPostStatus>();
let pageable = reactive<Pageable>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
});

onMounted(async () => {
  await getBlogPostList();
});

const getBlogPostList = async () => {
  const res = await cmsClient.blogPost.blogPostGetList({
    filter: filter.value,
    blogId: undefined,
    status: postStatus.value,
    skipCount: (pageable.pageNum - 1) * pageable.pageSize,
    maxResultCount: pageable.pageSize,
  });
  postList.value = res.items!;
  pageable.total = res.totalCount!;
};

watch(
  () => filter.value,
  async (newVal, oldVal) => {
    if (newVal !== oldVal) {
      filter.value = newVal;
      await getBlogPostList();
    }
  }
);

const handleCurrentChange = async (pageIndex: number) => {
  pageable.pageNum = pageIndex;
  await getBlogPostList();
};

const handleSizeChange = async (size: number) => {
  pageable.pageSize = size;
  await getBlogPostList();
};

const onFileDeleted = async (res: boolean) => {
  if (res) await getBlogPostList();
}
</script>

<style lang="scss" scoped></style>
<route lang="yaml">
name: blogPost.index
meta: 
  title: 文章列表
  description: 博客文章列表,你可以通过搜索装置对文章进行过滤
  visible: true
  keepAlive: true
  requiredAuth: false
  icon: Share
  order: 2
</route>
