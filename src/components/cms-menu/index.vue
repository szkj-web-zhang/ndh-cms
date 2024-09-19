<template>
  <template v-for="item in list" :key="item.name">
    <el-sub-menu v-if="item.children?.length" :index="item.path">
      <template #title>
        <div class="menu-icon flex-x-y" v-if="depth === 1">
          <svg-icon :name="item.meta.icon" fill="rgba(255,255,255,0.6)" />
        </div>
        {{ item.name }}
      </template>
      <cms-menu :depth="depth + 1" :list="item.children" />
    </el-sub-menu>
    <el-menu-item
      :class="`menu-item-${depth}`"
      v-else
      :index="item.path"
      @click="handleItemClick(item)"
    >
      <template #title>
        <div class="menu-icon flex-x-y" v-if="depth === 1">
          <svg-icon :name="item.meta.icon" fill="rgba(255,255,255,0.6)" />
        </div>
        <div class="lower-level-menu">{{ item.name }}</div>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import CmsMenu from "@/components/cms-menu/index.vue";
import { Router } from "@/stores/interface";
import { useRouter } from "vue-router";

interface PropsType {
  // 递归层级
  depth: number;
  // 菜单列表
  list: Router.RouterOption[];
}

defineProps<PropsType>();

// router
const router = useRouter();

/**
 * 菜单点击事件
 */
const handleItemClick = (item: Router.RouterOption) => {
  router.push(item.path);
};
</script>

<style lang="scss" scoped>
.menu-icon {
  width: 18px;
  height: 18px;
  line-height: 18px;
  margin-right: 8px;
}

:deep(.el-menu) {
  > .menu-item-2:last-child {
    box-sizing: content-box;
    padding-bottom: 12px;
  }
}

.el-sub-menu {
  background-color: transparent;
}

.menu-item-1 {
  height: 48px;
  color: #ffffff;
  &:hover {
    background-color: #212429;
  }
}

.menu-item-2 {
  height: 48px;
  position: relative;
  padding-left: 28px !important;
  .lower-level-menu {
    width: 100%;
    height: 100%;
    color: rgba(255, 255, 255, 0.6);
    border-radius: 8px;
    line-height: 48px;
    transition: all 0.2s ease;
    position: relative;
    margin-left: 12px;
    padding-left: 12px;
    &::before {
      content: "";
      width: 1px;
      height: 48px;
      position: absolute;
      top: 0;
      left: -12px;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  &:hover {
    background-color: transparent;
  }
  @at-root {
    &.is-active {
      .lower-level-menu {
        color: #ffffff;
        background-color: #1a7dff;
        transition: all 0.2s ease;
      }
    }
  }
}
</style>
