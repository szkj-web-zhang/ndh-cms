import { createApp } from "vue";
import App from "./App.vue";
// 全局样式
import "@/styles/global.scss";
import "@/styles/reset.scss";
import "@/styles/font.scss";
// icon
import "@/assets/icon/iconfont.js";
// 引入icon组件
import SvgIcon from "@/components/svg-icon/index.vue";
// 引入表格组件
import CmsTable from "@/components/cms-table/index.vue";
// 引入默认弹框组件
import DefaultDialog from "@/components/default-dialog/index.vue";
// 按需引入，使用ElMessage需导入
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/src/message.scss";
import * as Icons from "@element-plus/icons-vue";
// pinia
import pinia from "@/stores/index";
// 路由
import router from "@/router/index";

const app = createApp(App);

app.component("SvgIcon", SvgIcon);

app.component("CmsTable", CmsTable);

app.component("DefaultDialog", DefaultDialog);

Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(pinia).use(router).mount("#app");
