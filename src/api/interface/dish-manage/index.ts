import { PageRequest, PageResponse } from "..";

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
  // 规格信息
  export interface SpecsItem {
    skuName?: string; //规格名称
    skuPicture?: string; //规格图片
    price?: string; //价格
    stocks?: number | string; //库存
    partyCode?: string; //商家编码
    modelId?: string; //商品条形码
    version?: number; //版本号
    properties?: string;
  }
  // 规格详情
  export interface SpecsInfo extends SpecsItem {
    skuProperties: string; //规格属性
    skuVersion: number; //版本
    goodsId: number; //商品id
    skuStatus: number; //-1:删除 0:下架 1:启用
    currentPrice: number; //当前价格
    skuId: number; //规格id
  }
  // 菜品详情
  export interface DishDetail {
    brief: string;
    categoryId: number;
    categoryName: string;
    categoryPicture: string;
    commentNum: number;
    content: string;
    createTime: string;
    currentPrice: number;
    freezeStocks: number;
    goodsId: number;
    goodsName: string;
    goodsStatus: number;
    goodsUnit: string;
    imgs: string;
    inventoryStatus: number;
    originPrice: number;
    picture: string;
    putawayTime: string;
    salesNum: number;
    shopId: number;
    totalStocks: number;
    updateTime: string;
    version: number;
    viewCount: number;
  }
  // 参数信息
  export interface PropertyItem {
    paramName?: string; //参数名称
    paramValue?: string; //参数值
  }
  // 新增菜品入参
  export interface AddParams {
    categoryId?: number;
    goodsName: string; //菜品名称
    imgs?: string; //菜品图片，多张用逗号连接
    price: string; //价格
    goodsUnit: string; //单位，字符串
    brief?: string; //简介
    totalStocks?: number; //库存
    content: string; //描述
    tags?: string; //标签
    specs?: SpecsItem[]; //规格信息
    properties?: PropertyItem[]; //参数信息
  }
  // 菜品详情响应数据
  export interface DishDetailResponse {
    goods: DishDetail;
    specs: SpecsInfo[];
    properties: PropertyItem[];
  }
}

export namespace Category {
  // 分类item
  export interface Item {
    categoryId: number; //分类id
    parentId: number; //父级分类id
    categoryName: string; //分类名称
    categoryPicture: string; //分类图片
    sort: number; //排序
    children?: Item[]; //子分类
  }
  // 菜品列表响应数据
  export interface ListResponse extends PageResponse {
    list: Item[];
  }
  // 子分类入参
  export interface ChildrenCategoryParams extends PageRequest {
    categoryId: number;
  }
}
