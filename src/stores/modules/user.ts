import { defineStore } from "pinia";
import piniaPersistConfig from "@/stores/helper/persist";
import { UserStore } from "../interface";

export const useUserStore = defineStore({
  id: "user",
  state: (): UserStore.StoreData => ({
    token: "",
    userInfo: {}
  }),
  getters: {},
  actions: {
    // 存储token
    setToken(token: string) {
      this.token = token;
    },
    // 存储用户信息
    setUserInfo(userInfo: UserStore.StoreData["userInfo"]) {
      this.userInfo = userInfo;
    }
  },
  persist: piniaPersistConfig("ndh-user")
});
