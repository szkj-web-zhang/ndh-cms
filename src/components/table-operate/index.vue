<template>
  <div class="table-operate-container">
    <el-button
      link
      v-if="data.length <= 2"
      v-for="item in showButton"
      :type="item.buttonOption.type"
      @click="item.fn"
    >
      {{ item.buttonOption.label }}
    </el-button>
    <div class="flex-y" v-else>
      <el-button
        link
        v-for="item in showButton"
        :type="item.buttonOption.type"
        @click="item.fn"
      >
        {{ item.buttonOption.label }}
      </el-button>
      <el-dropdown trigger="click">
        <div class="more-button flex-y">
          <span>更多</span>
          <svg-icon name="icon-arrow-down-s" fill="#1A7DFF"></svg-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <div class="dropdown-list">
              <el-button
                link
                v-for="item in hideButton"
                :type="item.buttonOption.type"
                @click="item.fn"
              >
                {{ item.buttonOption.label }}
              </el-button>
            </div>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface ButtonOption {
  label: string;
  type: "primary" | "success" | "warning" | "danger" | "info" | "default";
}

export interface TableOperateProps {
  buttonOption: ButtonOption;
  fn: () => void;
}

interface PropsType {
  data: TableOperateProps[];
}

const props = defineProps<PropsType>();

// 当按钮少于等于两个
const showButton = computed(() => {
  return props.data.length <= 2 ? props.data : [props.data[0]];
});
// 当按钮多余两个时，隐藏的按钮
const hideButton = computed(() => props.data.slice(1));
</script>

<style lang="scss" scoped>
.table-operate-container {
  width: 100%;
  display: flex;
}

.el-button {
  font-size: 14px;
  font-family: PingFangRegular;
}

.more-button {
  height: 100%;
  font-size: 14px;
  color: #1a7dff;
  font-family: PingFangRegular;
  line-height: 22px;
  cursor: pointer;
  user-select: none;
  margin-left: 12px;
  > svg {
    width: 18px;
    height: 18px;
  }
}

.dropdown-list {
  width: 96px;
  box-sizing: border-box;
  padding: 0 20px;
  .el-button {
    height: 22px;
    margin-left: 0;
    padding: 0;
    margin-bottom: 6px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-button--default {
    color: #08090a;
  }
}
</style>
