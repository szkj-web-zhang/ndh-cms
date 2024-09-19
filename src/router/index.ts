import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from "vue-router";
import { staticRouter } from "./modules/static-router";
import NProgress from "@/utils/nprogress";
import { useUserStore } from "@/stores/modules/user";
import { useAuthStore } from "@/stores/modules/auth";
import { initDynamicRouter } from "./modules/dynamic-router";
import { ElMessage } from "element-plus";

const mode = import.meta.env.VITE_ROUTER_MODE;

const routerMode = {
  hash: () => createWebHashHistory(),
  history: () => createWebHistory()
};

const router = createRouter({
  history: routerMode[mode](),
  routes: [...staticRouter],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

/**
 * 路由重置
 */
const resetRouter = () => {
  const authStore = useAuthStore();
  authStore.flatMenuListGet.forEach(item => {
    const { name } = item;
    if (name && router.hasRoute(name)) router.removeRoute(name);
  });
};

/**
 * 路由拦截
 */
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const authStore = useAuthStore();

  NProgress.start();

  // 访问登陆页时，有 Token 就在当前页面，没有 Token 重置路由到登陆页
  if (to.path.toLocaleLowerCase() === "/login") {
    if (userStore.token) return next(from.fullPath);
    resetRouter();
    return next();
  }

  // 判断是否有 Token，没有重定向到 login 页面
  if (!userStore.token) {
    ElMessage.error("登录失效！请您重新登录");
    return next({ path: "/login", replace: true });
  }

  // 如果没有菜单列表，就重新请求菜单列表并添加动态路由
  if (!authStore.router.length) {
    await initDynamicRouter();
    return next({ ...to, replace: true });
  }

  // 正常访问页面
  next();
});

/**
 * 路由跳转错误
 */
router.onError(error => {
  NProgress.done();
});

/**
 * 路由跳转结束
 */
router.afterEach(() => {
  NProgress.done();
});

export default router;
