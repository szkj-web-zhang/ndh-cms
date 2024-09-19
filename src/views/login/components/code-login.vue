<template>
  <div class="code-container flex-y">
    <div class="code-img" v-loading="loading">
      <vue-qr
        :size="180"
        :margin="0"
        :logoSrc="codeImage"
        :logoScale="0.2"
        :text="qrcode?.code ?? ''"
      />
      <div v-if="isExpired" class="code-mask flex-c">
        <span>二维码已失效</span><span>请点击下方按钮刷新</span>
      </div>
    </div>
    <p class="code-text">请使用 <span>实名DID</span> 扫码登录</p>
    <el-button plain class="refresh-btn" @click="handleFreshQrcode">
      刷新二维码
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { Login, User } from "@/api/interface/login";
import { qrcode_get } from "@/api/modules/login";
import { onBeforeMount, onBeforeUnmount, ref } from "vue";
import vueQr from "vue-qr/src/packages/vue-qr.vue";
import codeImage from "@/assets/images/qrcode.png";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/modules/user";
import { useRouter } from "vue-router";
import { initDynamicRouter } from "@/router/modules/dynamic-router";

interface WsDataType {
  account: User.Info;
  result: number; // 0:取消 | 1：登录成功 | 2:扫码成功 | 3:码失效 | 4:账号不存在
  token: string;
}

// route
const router = useRouter();
// pinia
const userStore = useUserStore();
// 获取二维码返回数据
const qrcode = ref<Login.QRcodeResponse>();
// 二维码获取loading
const loading = ref(false);
// 二维码是否过期
const isExpired = ref(false);
// ws
const webSocket = ref<WebSocket>();

// 获取二维码
onBeforeMount(() => handleGetQrCode());

// 关闭ws连接
onBeforeUnmount(() => webSocket.value?.close());

/**
 * 登录成功判断
 */
const handleLoginSuccess = async (data: WsDataType) => {
  userStore.setToken(data.token);
  userStore.setUserInfo(data.account);
  ElMessage.success("登录成功");
  webSocket.value?.close();
  // 添加动态路由
  await initDynamicRouter();
  router.push("/layout");
};

/**
 * 建立socket连接
 */
const initSocket = (code?: string) => {
  if (typeof WebSocket === "undefined") {
    ElMessage.error("您的浏览器不支持WebSocket，请使用现代浏览器");
  } else {
    const ws = new WebSocket(
      `ws://106.13.113.251:8094/ndh-freshCms/codeWs/${code}`
    );
    webSocket.value = ws;
    ws.onopen = () => {
      // 60s后过期
      setTimeout(() => {
        isExpired.value = true;
      }, 60000);
    };
    ws.onmessage = e => {
      const data: WsDataType = JSON.parse(e.data);
      if (data.result === 1) {
        handleLoginSuccess(data);
      } else if (data.result === 3) {
        ElMessage.error("二维码失效");
      } else if (data.result === 4) {
        ElMessage.error("账号不存在");
      }
    };
    ws.onclose = () => console.log("连接关闭......");
    ws.onerror = err => console.log("WebSocket连接发生错误：" + err);
  }
};

/**
 * 获取二维码数据
 */
const handleGetQrCode = async () => {
  loading.value = true;
  const res = await qrcode_get();
  if (res.code === 200) {
    const perfix = `http://106.13.113.251:8094`;
    qrcode.value = {
      code: `${perfix}/did/auth_login?code=${res.data.code}`,
      time: res.data.time
    };
    initSocket(res.data.code);
  }
  loading.value = false;
};

/**
 * 刷新二维码数据
 */
const handleFreshQrcode = () => {
  webSocket.value?.close();
  isExpired.value = false;
  handleGetQrCode();
};
</script>

<style lang="scss" scoped>
.code-container {
  width: 100%;
  flex-flow: column nowrap;
  padding-top: 30px;
  margin-top: 24px;
}

.code-img {
  width: 180px;
  height: 180px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.code-mask {
  width: 180px;
  height: 180px;
  font-family: PingFangMedium;
  font-size: 12px;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  line-height: 20px;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(8, 9, 10, 0.72);
}

.code-text {
  font-family: PingFangMedium;
  font-size: 14px;
  color: #525b66;
  margin: 8px 0 24px 0;
  > span {
    color: #1a7dff;
  }
}

.refresh-btn {
  width: auto;
  height: 40px;
  font-family: PingFangMedium;
  font-size: 16px;
  color: #1a7dff;
  border-radius: 8px;
  border: 1px solid #1a7dff;
  padding: 8px;
}
</style>
