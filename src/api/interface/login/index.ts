export namespace Login {
  // 获取登录二维码
  export interface QRcodeResponse {
    code: string;
    time: number;
  }
  // 发送验证码入参
  export interface SendCodeParams {
    account: string;
    state: number;
  }
  // 验证码登录入参
  export interface CodeLoginParams {
    account: string;
    varificationCode: string;
  }
}

export namespace User {
  // 用户信息
  export interface Info {
    id: number; //用户id
    phoneNumber: string; //手机号
    cmsUuid: string; //uuid
    password: string;
    headPortrait: string; //头像
    nickName: string; //昵称
    registerIp: string; //注册ip
    registerTime: string; //注册时间
    recentLoginIp: string; //最近登录ip
    recentLoginTime: string; //最近登录时间
    blacklist: number; //1-正常 2-黑名单 3-注销
    parentUuid: string; //上级uuid
    didSymbol: string; //did标识
    createTime: string; //创建时间
    updateTime: string; //更新时间
    roles: number;
    depts: number;
  }
  export interface Response {
    account: Info;
    token: string;
  }
}

export namespace Menu {
  export interface MenuItem {
    id: number;
    parentId: number; //父id
    name: string;
    menuType: number; // 菜单类型，1--目录、2--菜单、3--按钮
    state: number; // 状态，1--正常、2--停用
    orderNumber: number; // 排序
    perms: string; // 权限标识
    remark: string; // 备注
    path: string;
    icon?: string;
    indexId?: string;
    children: MenuItem[];
  }
  export type Response = MenuItem[];
}
