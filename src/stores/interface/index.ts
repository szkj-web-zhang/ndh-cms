import { User } from "@/api/interface/login";

// 动态菜单interface
export namespace Router {
  export interface RouterOption {
    path: string;
    name: string;
    component?: string | (() => Promise<unknown>);
    redirect?: string;
    meta: Meta;
    children?: RouterOption[];
  }
  export interface Meta {
    id: number;
    icon: string;
    title: string;
    remark?: string;
    activeMenu?: string;
    isKeepAlive: boolean;
  }
}

// 存储用户信息和token
export namespace UserStore {
  export interface StoreData {
    token: string;
    userInfo: Partial<User.Info>;
  }
}

// 存储动态路由和权限
export namespace AuthStore {
  export interface StoreData {
    router: Router.RouterOption[];
  }
}

// 存储菜单标签列表
export namespace Tabs {
  export interface TabItem {
    icon: string;
    title: string;
    path: string;
    name: string;
    close: boolean;
    isKeepAlive: boolean;
  }
  export interface TabsStore {
    tabs: TabItem[];
  }
}
