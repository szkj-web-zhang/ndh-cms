// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob("@/views/pages/**/*.vue");

// 菜品详情路由
export const dishesDetail = {
  path: "/dishes-list/detail/:id",
  name: "菜品详情",
  component:
    modules[`/src/views/pages/dishes-list/components/dishes-detail.vue`],
  meta: {
    isKeepAlive: true,
    remarks: "dishes-detail",
    title: "菜品详情"
  }
};

export const dishAdd = {
  path: "/dishes-list/add",
  name: "新增菜品",
  component: modules[`/src/views/pages/dishes-list/components/dishes-add.vue`],
  meta: {
    isKeepAlive: true,
    remarks: "dishes-add",
    title: "新增菜品"
  }
};
