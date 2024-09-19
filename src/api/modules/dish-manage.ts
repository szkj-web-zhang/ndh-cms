import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";
import { Dish } from "../interface/dish-manage";
import qs from "qs";

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
