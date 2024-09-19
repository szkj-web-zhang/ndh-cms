<template>
  <div class="cms-aside flex-c">
    <div class="aside-header flex-y">
      <img class="aside-logo" src="@/assets/images/logo_2.png" />
      <div class="aside-text flex-c">
        <span>味来智厨</span>
        <span>管理端</span>
      </div>
    </div>
    <el-scrollbar>
      <el-menu
        class="aside-top-menu"
        :default-active="route.path"
        :unique-opened="true"
      >
        <cms-menu :depth="1" :list="menuList" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import CmsMenu from "@/components/cms-menu/index.vue";
import { useAuthStore } from "@/stores/modules/auth";
import { computed } from "vue";

// route
const route = useRoute();
// pinia
const authStore = useAuthStore();
// 获取菜单数据
const menuList = computed(() => authStore.router);
</script>

<style lang="scss" scoped>
@mixin left-box {
  content: "";
  width: 10px;
  height: 20px;
  border-radius: 8px;
  background-color: #1a7dff;
  position: absolute;
  top: 50%;
  left: -5px;
  transform: translate(0, -50%);
}

.aside-top-menu {
  font-family: PingFangRegular;
  font-size: 14px;
  background-color: transparent;
  border-right: none;
  :deep(.el-sub-menu) {
    background-color: #292d33;
    .el-sub-menu__title {
      height: 48px;
      color: #ffffff;
      user-select: none;
      &:hover {
        background-color: #212429;
      }
      .el-icon {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
        display: flex;
        align-items: center;
        justify-content: center;
        right: 20px;
        top: calc(50% - 2px);
      }
    }
    .el-menu {
      background-color: transparent;
    }
    &.is-opened {
      background-color: #31363d;
      .el-sub-menu__title:hover {
        background-color: #31363d;
      }
      .el-menu {
        background-color: #31363d;
      }
      @at-root {
        &.is-active {
          .el-sub-menu__title {
            position: relative;
            &::before {
              @include left-box();
            }
          }
        }
      }
    }
  }
  :deep(.is-active) {
    @at-root {
      &.el-sub-menu {
        .el-sub-menu__title {
          position: relative;
          &::before {
            @include left-box();
          }
          &:hover {
            background-color: #31363d;
          }
        }
      }
    }
    @at-root {
      &.menu-item-1 {
        position: relative;
        background-color: #31363d;
        &::before {
          @include left-box();
        }
      }
    }
  }
}

.cms-aside {
  width: 100%;
  height: 100%;
  background-color: #292d33;
  transition: width 0.3s ease;
  .aside-header {
    height: 56px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding: 0 20px;
  }
  .aside-logo {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    margin-right: 6px;
  }
  .aside-text {
    font-family: PingFangRegular;
    > span {
      &:first-child {
        height: 24px;
        font-family: PingFangMedium;
        color: #ffffff;
        font-size: 16px;
        line-height: 24px;
      }
      &:last-child {
        font-size: 12px;
        color: #7a8799;
      }
    }
  }
  .el-scrollbar {
    height: calc(100% - 56px);
  }
}
</style>
