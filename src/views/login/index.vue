<template>
  <div class="login-container">
    <div class="login-box flex-c">
      <img class="login-logo" src="@/assets/images/login_logo.png" alt="" />
      <div class="login-content">
        <div class="login-type">
          <el-tag class="login-tag" type="primary">
            {{ type === 1 ? "手机号登录" : "扫码登录" }}
          </el-tag>
          <el-image
            class="select-image"
            :src="selectImg"
            @click="handleChangeType"
          />
        </div>
        <p class="login-title">系统登录</p>
        <code-login v-if="type === 1" />
        <phone-login v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import codeImage from "@/assets/images/login_code.png";
import phoneImage from "@/assets/images/login_phone.png";
import CodeLogin from "./components/code-login.vue";
import PhoneLogin from "./components/phone-login.vue";

// 登录方式切换
const type = ref(1);
// 登录类型切换图片
const selectImg = computed(() => (type.value === 1 ? phoneImage : codeImage));

// 切换登录方式
const handleChangeType = () => (type.value = type.value === 1 ? 2 : 1);
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: url("../../assets/images/bg.png") no-repeat center;
  background-size: cover;
}

.login-box {
  min-width: 464px;
  min-height: 556px;
  position: absolute;
  top: 162px;
  left: 50%;
  transform: translate(-50%, 0);
  align-items: center;
  .login-logo {
    width: 256px;
    height: 96px;
    margin-bottom: 32px;
  }
  .login-title {
    width: 100%;
    height: 32px;
    font-size: 24px;
    font-family: PingFangMedium;
    color: #08090a;
    box-sizing: border-box;
    padding: 0 28px;
    margin-top: 28px;
    margin-bottom: 24px;
  }
  .login-type {
    display: flex;
  }
  .select-image {
    width: 48px;
    height: 48px;
    cursor: pointer;
  }
}

.login-content {
  width: 100%;
  min-height: 428px;
  background: #ffffff;
  box-shadow: 0px 0px 27px 0px rgba(31, 103, 211, 0.09);
  border-radius: 12px;
  border: 1px solid #ffffff;
  position: relative;
  .login-type {
    position: absolute;
    right: 8px;
    top: 9px;
  }
  .login-tag {
    font-family: PingFangMedium;
    font-size: 10px;
    color: #1a7dff;
    border: none;
    border-right: 4px;
    margin-right: 23px;
    margin-top: 7px;
  }
}
</style>
