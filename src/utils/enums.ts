// 请求配置
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 500,
  OVERDUE = 401,
  TIMEOUT = 30000,
  TYPE = "success"
}

// 请求方法
export enum RequestEnum {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE"
}

// 常用的 contentTyp 类型
export enum ContentTypeEnum {
  // json
  JSON = "application/json;charset=UTF-8",
  // text
  TEXT = "text/plain;charset=UTF-8",
  // form-data
  FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
  // form-data
  FORM_DATA = "multipart/form-data;charset=UTF-8"
}

// 本地设置菜单图标
export enum MeniIconEnum {
  "系统管理" = "icon-settings-3",
  "成员管理" = "icon-team-2",
  "平台配置" = "icon-paint-brush-line",
  "反馈列表" = "icon-question",
  "用户管理" = "icon-user-5-line",
  "财务管理" = "icon-copper-coin-line",
  "渠道管理" = "icon-organization-chart",
  "团队长管理" = "icon-account-pin-circle-line",
  "自提点管理" = "icon-map-pin",
  "菜品管理" = "icon-shopping-basket-line",
  "订单管理" = "icon-order"
}
