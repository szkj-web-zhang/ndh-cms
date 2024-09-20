import router from "@/router/index";
import { useAuthStore } from "@/stores/modules/auth";
import { useUserStore } from "@/stores/modules/user";
import { dishAdd, dishesDetail } from "@/utils/router-handler";
import { RouteRecordRaw } from "vue-router";

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob("@/views/pages/**/*.vue");

/**
 * 初始化动态路由
 */
export const initDynamicRouter = async () => {
  const userStore = useUserStore();
  const authStore = useAuthStore();
  try {
    await authStore.getAuthMenuList();

    // 1. 是否需要判断后端菜单返回为空做无权限返回登录处理
    if (!authStore.router.length) {
    }

    // 2. 遍历router，通过remark字段做文件路径映射，动态加载路由
    authStore.flatMenuListGet.forEach(async item => {
      item.children && delete item.children;
      const folder = item.meta.remark;
      item.component = modules[`/src/views/pages/${folder}/index.vue`];
      router.addRoute("layout", item as unknown as RouteRecordRaw);
    });
    const routes = router.getRoutes();

    routes.forEach(route => {
      if (route.path === "/dishes-list") {
        router.addRoute("layout", dishesDetail as unknown as RouteRecordRaw);
        router.addRoute("layout", dishAdd as unknown as RouteRecordRaw);
      }
    });
  } catch (err) {
    userStore.setToken("");
    userStore.setUserInfo({});
    router.replace("/login");
  }
};
