<template>
  <el-container>
    <el-aside width="200px">
      <cms-aside />
    </el-aside>
    <el-container class="layout">
      <el-header class="cms-header flex-y-b shadow-x">
        <cms-header />
      </el-header>
      <cms-tabs />
      <el-main>
        <router-view v-slot="{ Component, route }">
          <transition appear name="fade-transform" mode="out-in">
            <keep-alive :include="list">
              <component
                :key="route.path"
                :is="componentWrapper(Component, route)"
                v-if="isRouterFresh"
              />
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import CmsAside from "@/components/cms-aside/index.vue";
import CmsHeader from "@/components/cms-header/index.vue";
import CmsTabs from "@/components/cms-tabs/index.vue";
import { useRulesStore } from "@/stores/modules/rules";
import { storeToRefs } from "pinia";
import { h, provide, ref, RendererElement, RendererNode, VNode } from "vue";
import BreadCrumb from "@/components/bread-crumb/index.vue";
import { RouteLocationNormalizedLoadedGeneric } from "vue-router";

type ComponentArg = VNode<
  RendererNode,
  RendererElement,
  {
    [key: string]: any;
  }
>;

type RouteArg = RouteLocationNormalizedLoadedGeneric;

// 缓存规则
const rulesStore = useRulesStore();
const { list } = storeToRefs(rulesStore);
// 页面刷新状态
const isRouterFresh = ref(true);

/**
 * 详情页面keep-alive问题
 */
const wrapperMap = new Map();
const componentWrapper = (component: ComponentArg, route: RouteArg) => {
  if (!component) return;
  const wrapperName = route.fullPath;
  let wrapper = wrapperMap.get(wrapperName);
  if (!wrapper) {
    wrapper = { name: wrapperName, render: () => h(component) };
    wrapperMap.set(wrapperName, wrapper);
  }
  return h(wrapper);
};

/**
 * 页面刷新
 */
const handleRefreshPage = (val: boolean) => (isRouterFresh.value = val);

// 后代组件注入刷新方法
provide("refresh", handleRefreshPage);
</script>

<style lang="scss" scoped>
.layout {
  min-width: 600px;
}

.el-container {
  width: 100%;
  height: 100%;
}

.cms-header {
  height: 56px;
  box-sizing: content-box;
  line-height: 56px;
  border-bottom: 1px solid #e1eaf5;
  padding: 0;
}

.el-main {
  background: #f5f7fa;
  overflow: hidden;
  padding: 16px 20px 20px 20px;
}
</style>
