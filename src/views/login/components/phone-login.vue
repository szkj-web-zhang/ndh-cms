<template>
  <div class="phone-container flex-c">
    <div class="phone-tab">
      <p>手机号登录</p>
    </div>
    <div class="form-content">
      <el-form ref="formRef" :model="loginData" :rules="rules">
        <el-form-item prop="phone" class="phone-form">
          <el-input
            maxlength="11"
            placeholder="请输入手机号"
            v-model="loginData.phone"
          />
        </el-form-item>
        <el-form-item prop="code" class="code-form">
          <el-input
            placeholder="请输入验证码"
            maxlength="6"
            v-model="loginData.code"
            @blur="handleCodeInputBlur"
          />
          <el-button
            :style="buttonStyle"
            :disabled="isStart"
            :loading="loading"
            @click="handlePhoneCheck"
          >
            {{ buttonText }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button
      type="primary"
      class="login-btn"
      :loading="loginLoading"
      @click="handleClickLogin"
    >
      登录
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { send_sms_code, sms_code_login } from "@/api/modules/login";
import { useCountDown } from "@/hooks/use-count-down";
import { initDynamicRouter } from "@/router/modules/dynamic-router";
import { useUserStore } from "@/stores/modules/user";
import { phoneNumberVerify } from "@/utils/verify-rules";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { computed, reactive, ref, unref } from "vue";
import { useRouter } from "vue-router";

interface LoginRequire {
  phone: string;
  code: string;
}

// route
const router = useRouter();
// pinia
const userStore = useUserStore();
// from组件实例
const formRef = ref<FormInstance>();
// 登录数据
const loginData = reactive<LoginRequire>({
  phone: "13387578795",
  code: "123456"
});
// 验证码验证状态
const codeCheck = ref(true);
// 点击loading
const loading = ref(false);
// login loading
const loginLoading = ref(false);
// 倒计时hook
const { isStart, currentCount, handleStartTimer } = useCountDown(60);
// 获取倒计时按钮文本
const buttonText = computed(() =>
  !unref(isStart) ? "获取验证码" : `重新发送(${unref(currentCount)}s)`
);
// 按钮动态style
const buttonStyle = computed(() => {
  return {
    backgroundColor: `${!unref(isStart) ? "#1A7DFF" : "#F0F4FA"}`,
    color: `${!unref(isStart) ? "#ffffff" : "#A3B5CC"}`
  };
});

/**
 * 手机号校验
 */
const phoneFormCheck = (_rule: any, value: string, fn: any) => {
  if (!value) {
    return fn(new Error("手机号不能为空"));
  } else if (!phoneNumberVerify(value)) {
    return fn(new Error("手机号格式错误，请重试"));
  } else {
    return fn();
  }
};

/**
 * 验证码校验
 */
const codeFormCheck = (_rule: any, value: string, fn: any) => {
  if (value.length !== 6) {
    fn("请输入6位验证码");
  } else if (!codeCheck.value) {
    fn("验证码错误");
  } else {
    return fn();
  }
};

/**
 * 验证码输入框失去焦点事件
 */
const handleCodeInputBlur = () => {
  if (!codeCheck.value) {
    codeCheck.value = true;
    formRef.value?.validate();
  }
};

// 校验规则
const rules = reactive<FormRules<typeof loginData>>({
  phone: [{ validator: phoneFormCheck, trigger: "blur" }],
  code: [{ validator: codeFormCheck, trigger: "blur" }]
});

/**
 * 发送验证码
 */
const handleCodeSend = async () => {
  loading.value = true;
  try {
    await send_sms_code({
      account: loginData.phone,
      state: 2
    });
    handleStartTimer();
    ElMessage({
      message: "验证码发送成功",
      type: "success"
    });
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};

/**
 * 检查phone是否合法
 */
const handlePhoneCheck = () => {
  formRef.value?.validateField("phone", res => {
    if (res) {
      handleCodeSend();
    }
  });
};

/**
 * 点击登录接口
 */
const handleSendLogin = async () => {
  const params = { account: loginData.phone, varificationCode: loginData.code };
  loginLoading.value = true;
  const { code, data } = await sms_code_login(params);
  if (code === 200) {
    userStore.setUserInfo(data.account);
    userStore.setToken(data.token);
    // 添加动态路由
    await initDynamicRouter();
    router.push("/layout");
  } else if (code === 500) {
    codeCheck.value = false;
    formRef.value?.validate();
  }
  loginLoading.value = false;
};

/**
 * 登录按钮点击
 */
const handleClickLogin = () => {
  formRef.value?.validateField(["code", "phone"], res => {
    if (res) {
      handleSendLogin();
    }
  });
};
</script>

<style lang="scss" scoped>
.phone-container {
  padding: 0 28px;
  margin-top: 24px;
}

.phone-tab {
  height: 40px;
  margin-bottom: 20px;
  > p {
    width: 204px;
    height: 100%;
    font-size: 18px;
    color: #1a7dff;
    font-family: PingFangMedium;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 40px;
    border-bottom: 2px solid #1a7dff;
  }
}

.form-content {
  padding: 0 4px;
  .el-input {
    height: 56px;
    :deep(.el-input__wrapper) {
      border-radius: 12px;
      border: 1px solid #e1eaf5;
      box-shadow: none;
      padding: 17px 16px;
      .el-input__inner {
        font-size: 14px;
        color: #08090a;
        font-family: PingFangMedium;
      }
    }
  }
}

.phone-form {
  margin-bottom: 20px;
  @at-root {
    :deep(.is-error) {
      .el-input__wrapper {
        border-color: var(--el-color-danger) !important;
      }
    }
  }
}

.code-form {
  :deep(.el-form-item__content) {
    justify-content: space-between;
  }
  .el-input {
    width: 268px;
  }
  .el-button {
    width: 120px;
    height: 100%;
    font-family: PingFangMedium;
    border-radius: 12px;
    border: none;
  }
}

.login-btn {
  width: 100%;
  height: 56px;
  font-family: PingFangMedium;
  font-size: 18px;
  color: #ffffff;
  border-radius: 12px;
}
</style>
