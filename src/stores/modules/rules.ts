import { defineStore } from "pinia";

export const useRulesStore = defineStore({
  id: "ndh-rules",
  state: (): { list: string[] } => ({
    list: []
  }),
  actions: {
    /**
     * 添加缓存规则
     */
    async handleAddRules(name: string) {
      !this.list.includes(name) && this.list.push(name);
    },
    /**
     * 移除缓存规则
     */
    async handleRemoveRules(name: string) {
      this.list = this.list.filter(item => item !== name);
    },
    /**
     * 重置缓存规则
     */
    async handleSetRules(list: string[] = []) {
      this.list = list;
    }
  }
});
