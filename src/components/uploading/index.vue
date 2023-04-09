<template>
  <div class="upload-box">
    <el-upload
      action="#"
      :id="id"
      :class="['upload']"
      :multiple="false"
      :disabled="disabled"
      :show-file-list="false"
      :http-request="handleHttpUpload"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :style="uploadStyle"
      :drag="drag"
      accept="image/jpeg,image/jpeg,image/png"
    >
      <img v-if="fileUrl" :src="fileUrl" class="upload-image" />
      <el-icon v-else class="upload-icon"><Plus /></el-icon>
      <div v-if="fileUrl" class="upload-handle" @click.stop>
        <div class="handle-icon" @click="imageView">
          <el-icon><ZoomIn /></el-icon>
          <span>查看</span>
        </div>
        <div class="handle-icon" @click="deleteImg" v-if="!disabled">
          <el-icon><Delete /></el-icon>
          <span>删除</span>
        </div>
      </div>
    </el-upload>
    <div class="el-upload__tip">
      <slot name="tip"></slot>
    </div>
    <el-image-viewer
      v-if="dialogVisible"
      @close="imageView"
      :url-list="[fileUrl as string]"
    />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, computed } from "vue";
import { ElNotification } from "element-plus";
import type { UploadProps, UploadRequestOptions } from "element-plus";

import { MediaDescriptorService, MediaDescriptorDto } from "/@/openapi/index";

interface UploadFileProps {
  id?: string; // 组件id ==> 非必传，当页面存在多个上传组件时必传（默认为upload）
  entityType: string; //在当前系统中必传，用于区分上传的文件类型
  drag?: boolean; // 是否支持拖拽上传 ==> 非必传（默认为true）
  disabled?: boolean; // 是否禁用上传组件 ==> 非必传（默认为false）
  fileSize?: number; // 单个文件大小限制 ==> 非必传（默认为 5M）
  uploadStyle?: { [key: string]: any }; // 上传组件样式 ==> 非必传,
}
// 接受父组件参数
const props = withDefaults(defineProps<UploadFileProps>(), {
  id: "upload",
  drag: true,
  disabled: false,
  fileSize: 5,
  uploadStyle: () => ({ width: "175px", height: "175px" }),
});

let fileUrl = computed(() => {
  if (fileUploadResult.value.name) {
    return `${import.meta.env["VITE_API_URL"]}/api/cms/media/${
      fileUploadResult.value.id
    }`;
  }
  return null;
});

let fileUploadResult = ref<MediaDescriptorDto>({});

/**
 * @description 图片上传
 * @param options 上传的文件
 * */
interface UploadEmits {
  (e: "update:file", value: MediaDescriptorDto): void;
  (e: "check-validate"): void;
}

const emit = defineEmits<UploadEmits>();

const handleHttpUpload = async (options: UploadRequestOptions) => {
  try {
    const result = await MediaDescriptorService.mediaDescriptorCreate({
      entityType: props.entityType as string,
      name: options.file.name,
      formData: {
        File: options.file,
      },
    });
    fileUploadResult.value = result;
    emit("update:file", result);
    emit("check-validate");
  } catch (error) {
    options.onError(error as any);
  }
};

/**
 * @description 删除图片,同样触发update:file事件，更新一个空数据
 * */
const deleteImg = async () => {
  await MediaDescriptorService.mediaDescriptorDelete({
    id: fileUploadResult.value.id as string,
  });
  fileUploadResult.value = {};

  emit("update:file", fileUploadResult.value);
};

/**
 * @description 文件上传之前判断
 * @param rawFile 上传的文件
 * */
const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  const imgSize = rawFile.size / 1024 / 1024 < props.fileSize;
  const imgType = ["image/jpg", "image/jpeg", "image/png"];
  if (!imgType.includes(rawFile.type))
    ElNotification({
      title: "温馨提示",
      message: "上传图片必须是 JPG/JPEG/PNG 格式！",
      type: "warning",
    });
  if (!imgSize)
    ElNotification({
      title: "温馨提示",
      message: `上传图片大小不能超过 ${props.fileSize}MB！`,
      type: "warning",
    });
  return imgType.includes(rawFile.type) && imgSize;
};

// 图片上传成功提示
const uploadSuccess = () => {
  ElNotification({
    title: "系统提示",
    message: "上传成功！",
    type: "success",
  });
};

// 图片上传错误提示
const uploadError = () => {
  ElNotification({
    title: "系统提示",
    message: "图片上传失败，请您重新上传！",
    type: "error",
  });
};

// 查看图片
const dialogVisible = ref(false);
const imageView = () => {
  dialogVisible.value = !dialogVisible.value;
};
</script>
<script lang="ts">
export default defineComponent({
  name: "uploadImg",
});
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
