// 请求响应参数（不包含data）
export interface Result {
  code: number;
  msg: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T;
}

// 分页响应参数
export interface PageResponse {
  totalCount: number; //总数量
  pageSize: number;
  totalPage: number; //总页数
  currPage: number; //当前页
}
