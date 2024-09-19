<template>
  <el-dialog
    width="30%"
    style="min-height: 182px; padding: 0; border-radius: 8px"
    v-model="isShow"
    :show-close="false"
  >
    <div class="dialog-container">
      <div class="dialog-title flex-r">
        <div class="icon">
          <svg-icon :name="iconName" :fill="iconColor" />
        </div>
        <span>{{ title }}</span>
      </div>
      <div class="dialog-btns flex-y">
        <el-button class="btn-cancel" link type="primary" @click="close">
          取消
        </el-button>
        <el-button
          class="btn-confirm"
          type="primary"
          @click="emit('confirm', id)"
        >
          确定
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface PropsType {
  iconName: string;
  iconColor: string;
  title: string;
}

const props = defineProps<PropsType>();

const emit = defineEmits<{
  confirm: [value: number | string | undefined];
}>();

// 弹窗状态
const isShow = ref(false);
// 存储id
const id = ref<number | string>();

// 打开
const open = (res: number | string) => {
  isShow.value = true;
  id.value = res;
};

// 关闭
const close = () => (isShow.value = false);

// 确定

defineExpose({
  open,
  close
});
</script>

<style lang="scss" scoped>
.dialog-container {
  width: 100%;
}

.dialog-title {
  width: 100%;
  font-family: PingFangMedium;
  color: #525b66;
  font-size: 18px;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid #e1eaf5;
  padding: 0 20px;
  padding-bottom: 40px;
  margin-top: 24px;
  .icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  > span {
    flex: 1;
  }
}

.dialog-btns {
  width: 100%;
  justify-content: flex-end;
  box-sizing: border-box;
  margin-top: 16px;
  padding: 0 20px;
  padding-bottom: 20px;
}

.btn-cancel {
  font-size: 16px;
  font-family: PingFangMedium;
}

.btn-confirm {
  font-size: 16px;
  font-family: PingFangMedium;
  border-radius: 8px;
}
</style>
