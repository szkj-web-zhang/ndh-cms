import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";
import { Category, Dish } from "../interface/dish-manage";
import qs from "qs";
import { PageRequest } from "../interface";

// 获取菜品状态列表
export const dish_list_status_get = () => {
  return http.get<{ data: Array<Record<number, string>> }>(
    PORT1 + `/goods/statusList`,
    {},
    { loading: false }
  );
};

// 分页搜索商品信息
export const dishes_list_get = (params: Dish.ListParams) => {
  if (params.status === 0) delete params.status;
  return http.post<{ pageUtils: Dish.ListResponse }>(
    PORT1 + `/goods/goodsList`,
    params
  );
};

// 商品下架(单个/批量)
export const dishes_remove_post = (params: { goodsIds: string }) => {
  return http.post(PORT1 + `/goods/offSale`, params);
};

// 菜品详情
export const dish_detail_get = (params: { goodsId: number }) => {
  return http.post<Dish.DishDetailResponse>(
    PORT1 + `/goods/goodsDetail`,
    params
  );
};

// 获取菜品一级分类
export const dish_category_first_get = (params: PageRequest) => {
  return http.get<Category.ListResponse>(PORT1 + `/category/root`, params, {
    loading: false
  });
};

// 获取菜品子分类
export const dish_category_second_get = (
  params: Category.ChildrenCategoryParams
) => {
  return http.get<Category.ListResponse>(PORT1 + `/category/list`, params, {
    loading: false
  });
};

// 新增菜品
export const dish_add_post = (params: Dish.AddParams) => {
  return http.post(PORT1 + `/goods/add`, params);
};
