<template>
  <el-row v-if="blogPosts && blogPosts.length > 0" :gutter="20" justify="center">
    <el-col v-for="post in blogPosts">
      <el-card shadow="hover" style="margin-bottom: 10px">
        <div class="post">
          <div class="post-profile">
            <el-avatar icon="UserFilled" :size="48"></el-avatar>
            <el-tag type="danger" style="margin-top: 10px" effect="dark">
              {{ post.blogName }}
            </el-tag>
          </div>
          <div class="post-desc">
            <span class="post-desc-title">
              <router-link :to="{
                name: 'blogPost.detail',
                params: { blogPostId: post.id },
              }">
                {{ post.title }}
              </router-link>
            </span>
            <span class="post-desc-subtitle">
              <el-icon>
                <Calendar />
              </el-icon>
              &nbsp;发布于{{ dayjs(post.creationTime).format("YYYY年MM月DD日") }}
            </span>
            <span class="post-desc-content">
              <span>{{ cutContent(post.content!) }}</span>
              <span class="post-desc-content-read-more">
                <el-button type="info" text size="small" @click="checkPost(post.id!)">
                  阅读更多
                  <el-icon>
                    <Right></Right>
                  </el-icon>
                </el-button>
              </span>
            </span>
          </div>
          <div class="post-img">
            <el-image v-if="post.coverImageMediaId" fit="contain" style="border-radius:12px;"
              :src="coverImageMedia(post.coverImageMediaId as string)">
            </el-image>
            <div v-else class="post-img-placeholder">
              <span>{{ post.title?.substring(0, 2) }}</span>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { BlogPostListDto, BlogDto, BlogPostService } from "/@/openapi/cms";
import { PropType, onMounted } from "vue";

import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";

let router = useRouter();

let props = defineProps({
  blogPosts: {
    type: Array<BlogPostListDto>,
    require: true,
    default: [],
  },
  blog: {
    type: Object as PropType<BlogDto>,
    require: false,
    default: undefined,
  },
});

const coverImageMedia = (id: string) => {
  return `${import.meta.env["VITE_API_CMS_URL"]}/api/cms/media/${id}`;
};

const checkPost = (postId: string) => {
  router.push({
    name: "blogPost.detail",
    params: {
      blogPostId: postId,
    },
  });
};





const cutContent = (content: string) => {
  let regex = /(<([^>]+)>)/gi;
  return content.replace(regex, "").substring(0, 120);
};
</script>

<style lang="scss" scoped>
.post {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  &-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0.5;
    padding: var(--ba-main-space) 0 0 0;
  }

  &-desc {
    display: flex;
    flex-direction: column;
    padding: var(--ba-main-space) var(--ba-main-space) 0 0;
    flex: 2.5;

    &-title {
      font-size: 16px;
      font-weight: 500;
      color: #333;
      margin-bottom: 10px;
    }

    &-subtitle {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #999;
      margin-bottom: 10px;
    }

    &-content {
      font-size: 9px;
      color: #999;
      margin-bottom: 10px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      text-overflow: ellipsis;
      overflow: hidden;

      &-read-more {
        position: relative;
        margin-right: 5px;
        white-space: nowrap;
      }
    }
  }

  &-img {
    padding: var(--ba-main-space) 0 var(--ba-main-space) 0;
    display: flex;
    align-items: center;
    flex: 1;

    &-placeholder {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
      padding: var(--ba-main-space) 0 var(--ba-main-space);
      flex: 1;
      background: linear-gradient(135deg, #903282 0%, #e04cca 100%);

      span {
        font-size: 3rem;
        color: #fff;
        opacity: .5;
        line-height: 1;
        font-weight: 100;
        text-shadow: 0 0 35px rgba(0, 0, 0, .5);
      }
    }
  }


}
</style>
