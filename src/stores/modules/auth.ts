import { defineStore } from "pinia";
import { AuthStore } from "../interface";
import { auth_list_get } from "@/api/modules/login";
import {
  filterPermisMenu,
  getFlatRouterList,
  getTransferRouterList
} from "@/utils/data-handler";

export const useAuthStore = defineStore({
  id: "auth",
  state: (): AuthStore.StoreData => ({
    router: []
  }),
  getters: {
    // 扁平化处理后的menu
    flatMenuListGet: state => getFlatRouterList(state.router)
  },
  actions: {
    /**
     * 获取动态权限菜单
     */
    async getAuthMenuList() {
      const res = await auth_list_get();
      if (res.code === 200) {
        const router = getTransferRouterList(res.data, filterPermisMenu);
        this.router = router;
      }
    }
  }
});
