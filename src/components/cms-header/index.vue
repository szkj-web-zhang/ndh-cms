<template>
  <span class="cms-header-lf">社区团购后台管理系统</span>
  <div class="cms-header-ri flex-r">
    <div class="user-info flex-y">
      <el-avatar :size="36" :icon="UserFilled" :src="userInfo.headPortrait" />
      <span class="user-name">{{ userInfo.nickName }}</span>
      <el-tag type="primary">管理员</el-tag>
      <div class="drop-down-box flex-x-y">
        <svg-icon name="icon-arrow-down-s" fill="#7A8799" />
      </div>
    </div>
    <div class="logout-box flex-y" @click="handleLogout">
      <div class="logout-icon-box flex-x-y">
        <svg-icon name="icon-icon-tuichu" />
      </div>
      <span>退出登录</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTabsStore } from "@/stores/modules/tabs";
import { useUserStore } from "@/stores/modules/user";
import { UserFilled } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

// router
const router = useRouter();
// pinia
const userStore = useUserStore();
const tabsStore = useTabsStore();
const { userInfo } = storeToRefs(userStore);

/**
 * 退出登录
 */
const handleLogout = () => {
  userStore.setToken("");
  userStore.setUserInfo({});
  tabsStore.handleSetTabs([]);
  router.push("/login");
};
</script>

<style lang="scss" scoped>
.cms-header-lf {
  font-family: PingFangMedium;
  font-size: 16px;
  color: #292d33;
  white-space: nowrap;
  margin-left: 24px;
}

.cms-header-ri {
  height: 100%;
  align-items: center;
  margin-right: 24px;
  .user-info {
    height: 100%;
  }
  .user-name {
    font-family: PingFangMedium;
    font-size: 14px;
    color: #08090a;
    display: inline-flex;
    align-items: center;
    line-height: 22px;
    white-space: nowrap;
    margin-left: 8px;
    margin-right: 2px;
  }
  .drop-down-box {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-left: 8px;
  }
  .logout-box {
    height: 24px;
    cursor: pointer;
    position: relative;
    margin-left: 40px;
    &::before {
      content: "";
      width: 1px;
      height: 24px;
      background-color: #e1eaf5;
      position: absolute;
      top: 0;
      left: -20px;
    }
    > span {
      font-family: PingFangMedium;
      font-size: 14px;
      color: #7a8799;
      line-height: 22px;
    }
  }
  .logout-icon-box {
    width: 24px;
    height: 24px;
    margin-right: 4px;
  }
}
</style>
