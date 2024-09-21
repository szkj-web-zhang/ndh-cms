<template>
  <div class="editor-box">
    <Toolbar
      class="editor-toolbar"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      :style="{ height, minHeight: '142px' }"
      class="editor-content"
      v-model="valueHtml"
      :mode="mode"
      :default-config="editorConfig"
      @on-created="handleCreated"
      @on-blur="handleBlur"
    />
  </div>
</template>

<script lang="ts" setup>
import { upload_image } from "@/api/modules/upload";
import { IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { formContextKey, formItemContextKey } from "element-plus";
import { computed, inject, onBeforeUnmount, shallowRef } from "vue";

interface PropsType {
  // 富文本高度
  height?: string;
  // 富文本值
  value: string;
  // 工具栏配置
  toolbarConfig?: Partial<IToolbarConfig>;
  // 编辑器配置
  editorConfig?: Partial<IEditorConfig>;
  // 富文本模式
  mode?: "default" | "simple";
}

const props = withDefaults(defineProps<PropsType>(), {
  mode: "default",
  toolbarConfig: () => {
    return {
      excludeKeys: []
    };
  },
  editorConfig: () => {
    return {
      placeholder: "请输入内容...",
      MENU_CONF: {}
    };
  }
});

const emit = defineEmits<{
  "update:value": [value: string];
  "check-validate": [];
}>();

// 获取 el-form 组件上下文
const formContext = inject(formContextKey, void 0);
// 获取 el-form-item 组件上下文
const formItemContext = inject(formItemContextKey, void 0);
// 富文本 DOM 元素
const editorRef = shallowRef();
// 富文本的内容监听，触发父组件改变，实现双向数据绑定
const valueHtml = computed({
  get() {
    return props.value;
  },
  set(val: string) {
    // 防止富文本内容为空时，校验失败
    if (editorRef.value.isEmpty()) val = "";
    emit("update:value", val);
  }
});

/**
 * 上传图片配置
 */
type InsertFnTypeImg = (url: string, alt?: string, href?: string) => void;
props.editorConfig.MENU_CONF!["uploadImage"] = {
  async customUpload(file: File, insertFn: InsertFnTypeImg) {
    let formData = new FormData();
    formData.append("picture", file);
    formData.append("folderName", "did");
    try {
      const { data } = await upload_image(formData);
      insertFn(`${import.meta.env.VITE_IMAGE_PREFIX}${data}`);
    } catch (error) {
      console.log(error);
    }
  }
};

/**
 * 实列化编辑器
 */
const handleCreated = (editor: any) => {
  editorRef.value = editor;
};

/**
 * 失去焦点
 */
const handleBlur = () => {
  formItemContext?.prop &&
    formContext?.validateField([formItemContext.prop as string]);
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  if (!editorRef.value) return;
  editorRef.value.destroy();
});

defineExpose({
  editor: editorRef
});
</script>

<style lang="scss" scoped>
.editor-box {
  z-index: 2;
  width: 100%;
  border: 1px solid var(--el-border-color-darker);
  .editor-toolbar {
    border-bottom: 1px solid var(--el-border-color-darker);
  }
  .editor-content {
    overflow-y: hidden;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #c9c8c8;
    border-radius: 4px;
  }
}
</style>
