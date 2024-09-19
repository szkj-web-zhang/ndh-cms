<template>
  <div class="tabs-container">
    <el-tabs
      v-model="tabValue"
      type="border-card"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
        :closable="item.close"
      >
        <template #label>
          {{ item.title }}
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { useTabsStore } from "@/stores/modules/tabs";
import { TabPaneName, TabsPaneContext } from "element-plus";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

// route
const route = useRoute();
const router = useRouter();
// pinia
const tabsStore = useTabsStore();
// 选中的tab
const tabValue = ref(route.fullPath);
// tab列表
const tabList = computed(() => tabsStore.tabs);

// 监听路由变化，在前进后退时保证tab切换
watch(
  () => route.fullPath,
  () => {
    if (route.fullPath === "/layout") return;
    tabValue.value = route.fullPath;
    const tabsParams = {
      icon: route.meta.icon as string,
      title: route.name as string,
      path: route.fullPath,
      name: route.name as string,
      close: !route.meta.isAffix,
      isKeepAlive: route.meta.isKeepAlive as boolean
    };
    tabsStore.handleAddTab(tabsParams);
  },
  { immediate: true }
);

/**
 * 点击tab
 */
const handleTabClick = (res: TabsPaneContext) => {
  const fullPath = res.props.name as string;
  router.push(fullPath);
};

/**
 * 删除tab
 */
const handleTabRemove = (res: TabPaneName) => {
  tabsStore.handleRemoveTab(res as string, res == route.fullPath);
};
</script>

<style lang="scss" scoped>
.tabs-container {
  width: 100%;
  height: 40px;
  .el-tabs {
    height: 100%;
    box-sizing: border-box;
    :deep(.el-tabs__content) {
      display: none;
    }
    :deep(.el-tabs__header) {
      height: 100%;
      background-color: #ffffff;
      border-bottom: none;
      box-shadow: 0px 1px 4px 0px rgba(20, 56, 102, 0.08);
      .el-tabs__nav-wrap {
        height: inherit;
        margin-bottom: 0;
        .el-tabs__nav-prev,
        .el-tabs__nav-next {
          width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        @at-root {
          &.is-scrollable {
            padding: 0 40px;
          }
        }
      }
      .el-tabs__nav-scroll {
        height: inherit;
        .el-tabs__item {
          max-width: 270px;
          min-width: 144px;
          font-size: 14px;
          color: #292d33;
          font-family: PingFangRegular;
          box-sizing: content-box;
          border: none;
          justify-content: space-between;
          margin-left: 0;
          margin-top: 0;
          padding: 0 12px;
          &::after {
            content: "";
            width: 1px;
            height: 20px;
            background-color: #e1eaf5;
            position: absolute;
            top: calc(50% + 1px);
            right: 0;
            transform: translate(0, -50%);
          }
          @at-root {
            &.is-active {
              background-color: #ebf4ff;
              border-right-color: transparent;
              border-left-color: transparent;
              position: relative;
              &::before {
                content: "";
                width: 100%;
                height: 2px;
                background-color: #1a7dff;
                position: absolute;
                left: 0;
                bottom: 0;
              }
            }
          }
        }
      }
      .el-tabs__nav {
        height: inherit;
      }
    }
    @at-root {
      .el-tabs--border-card {
        border: none;
      }
    }
  }
}
</style>
