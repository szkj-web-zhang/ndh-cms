import { PageResponse } from "..";

export namespace Dish {
  // 菜品列表分类响应数据
  export type StatusResponse = string[];
  // 获取菜品列表入参
  export interface ListParams {
    page: number; //价格排序(0 综合 1:从高到低  2:从低到高)
    pageSize: number; //最低价格
    categoryId?: number; //最高价格
    searchKey?: string;
    status?: number | null;
  }
  // 菜品列表数据
  export interface ItemData {
    unitName: string; //单位名称
    goodsId: number; //商品id
    currentPrice: number; //现价
    salesNum: number; //已售数量
    goodsTag: string; //商品标签
    reminderStocks: number; //剩余库存
    updateTime: string; //更新时间
    originPrice: number; //原价
    picture: string; //图片
    stocks: number; //库存
    goodsStatus: number; //状态 1，表示正常状态,-1表示删除, 0下架
    createTime: string; //创建时间
    goodsUnit: number; //数量单位
    goodsName: string; //商品名称
  }
  // 菜品列表响应数据
  export interface ListResponse extends PageResponse {
    list: ItemData[];
  }
}
