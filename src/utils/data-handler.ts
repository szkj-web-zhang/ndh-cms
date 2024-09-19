import { Menu } from "@/api/interface/login";
import { Router } from "@/stores/interface";
import { MeniIconEnum } from "./enums";

export type RouterTransferFn = <T>(
  data: Menu.Response,
  fn: (...arg: any[]) => T
) => Router.RouterOption[];

/**
 * 递归删除menuType为3的children，用于过滤菜单权限
 */
export const filterPermisMenu = (data: Menu.MenuItem[]): Menu.MenuItem[] => {
  const temp = data.filter(item => item.menuType === 1 || item.menuType === 2);
  return temp.map(item => ({
    ...item,
    children: filterPermisMenu(item.children)
  }));
};

/**
 * 递归动态权鉴菜单，转换为路由类型
 * @param data 接口返回数据
 * @param fn 筛选规则，根据接口字段筛选需要数据
 * @returns
 */
export const getTransferRouterList: RouterTransferFn = (data, fn) => {
  const arr: Router.RouterOption[] = [];
  const temp = fn(data) as Menu.MenuItem[];
  for (let i = 0; i < temp.length; i++) {
    const item = temp[i];
    arr.push({
      path: item.path as string,
      name: item.name,
      meta: {
        id: item.id,
        title: item.name,
        icon: MeniIconEnum[item.name],
        remark: item.remark,
        isKeepAlive: true
      },
      children: item.children && getTransferRouterList(item.children, fn)
    });
  }
  return arr;
};

/**
 * 使用递归扁平化菜单，方便添加动态路由
 * @param menuList 接口返回权限菜单
 * @returns
 */
export const getFlatRouterList = (
  menuList: Router.RouterOption[]
): Router.RouterOption[] => {
  let newMenuList: Router.RouterOption[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.flatMap(item => [
    item,
    ...(item.children ? getFlatRouterList(item.children) : [])
  ]);
};

/**
 * 递归找到当前路由所属的父级路由
 * @param list 路由列表
 * @param path 当前路径
 * @param parent 父级路由，没有返回null
 * @returns
 */
export const handleGetRootRouter = (
  list: Router.RouterOption[],
  path: string,
  parent?: Router.RouterOption
) => {
  for (const item of list) {
    if (item.path === path) {
      return parent;
    }
    if (item.children) {
      const result = handleGetRootRouter(item.children, path, item);
      if (result) {
        return result;
      }
    }
  }
  return null;
};
