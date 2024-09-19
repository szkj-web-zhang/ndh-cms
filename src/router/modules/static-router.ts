import { RouteRecordRaw } from "vue-router";

export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/layout"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/views/layout/index.vue"),
    children: [
      {
        path: "/layout",
        component: () => import("@/views/pages/landing/index.vue")
      },
      {
        path: "/:pathMatch(.*)*",
        component: () => import("@/views/pages/landing/index.vue")
      }
    ]
  }
];
