import { defineStore } from "pinia";
import { Tabs } from "../interface";
import { useRulesStore } from "./rules";
import router from "@/router";
import piniaPersistConfig from "../helper/persist";

const rulesStore = useRulesStore();

export const useTabsStore = defineStore({
  id: "ndh-tabs",
  state: (): Tabs.TabsStore => ({
    tabs: []
  }),
  actions: {
    /**
     * 添加tab
     */
    async handleAddTab(res: Tabs.TabItem) {
      if (this.tabs.every(item => item.path !== res.path)) {
        this.tabs.push(res);
      }
      // 添加进缓存规则
      if (!rulesStore.list.includes(res.name) && res.isKeepAlive) {
        rulesStore.handleAddRules(res.path);
      }
    },
    /**
     * 删除tab
     */
    async handleRemoveTab(tabPath: string, isCurrent: boolean = true) {
      if (isCurrent) {
        this.tabs.forEach((item, index) => {
          if (item.path !== tabPath) return;
          const nextTab = this.tabs[index + 1] || this.tabs[index - 1];
          if (!nextTab) {
            router.push("/layout");
            return;
          }
          router.push(nextTab.path);
        });
      }
      // 从缓存规则删除
      const tabItem = this.tabs.find(item => item.path === tabPath);
      tabItem?.isKeepAlive && rulesStore.handleRemoveRules(tabItem.path);
      // 更新tab
      this.tabs = this.tabs.filter(item => item.path !== tabPath);
    },
    /**
     * 重置tab列表
     */
    async handleSetTabs(list: Tabs.TabItem[]) {
      this.tabs = list;
    }
  },
  persist: piniaPersistConfig("ndh-tabs")
});
