import { Menu } from "@/api/interface/login";

export const menuList: Menu.Response = [
  {
    id: 1,
    parentId: 0,
    name: "订单管理",
    menuType: 1,
    state: 1,
    orderNumber: 1,
    perms: "",
    remark: "",
    icon: "icon-order",
    path: "/order-manage",
    children: [
      {
        id: 1.1,
        parentId: 0,
        name: "菜品订单",
        menuType: 1,
        state: 1,
        orderNumber: 1,
        perms: "",
        remark: "",
        path: "/food-manage",
        children: []
      },
      {
        id: 1.2,
        parentId: 0,
        name: "配送订单",
        menuType: 1,
        state: 1,
        orderNumber: 1,
        perms: "",
        remark: "",
        path: "/delivery-manage",
        children: []
      },
      {
        id: 1.3,
        parentId: 0,
        name: "售后订单",
        menuType: 1,
        state: 1,
        orderNumber: 1,
        perms: "",
        remark: "",
        path: "/sale-manage",
        children: []
      }
    ]
  },
  {
    id: 2,
    parentId: 0,
    name: "菜品管理",
    menuType: 1,
    state: 1,
    orderNumber: 1,
    perms: "",
    remark: "",
    icon: "icon-shopping-basket-line",
    path: "/dishes-manage",
    children: [
      {
        id: 2.1,
        parentId: 0,
        name: "菜品列表",
        menuType: 1,
        state: 1,
        orderNumber: 1,
        perms: "",
        remark: "",
        path: "/dishes-list",
        children: []
      },
      {
        id: 2.2,
        parentId: 0,
        name: "仓库",
        menuType: 1,
        state: 1,
        orderNumber: 1,
        perms: "",
        remark: "",
        path: "/store",
        children: []
      },
      {
        id: 2.3,
        parentId: 0,
        name: "回收站",
        menuType: 1,
        state: 1,
        orderNumber: 1,
        perms: "",
        remark: "",
        path: "/recycle",
        children: []
      },
      {
        id: 2.4,
        parentId: 0,
        name: "菜品分类",
        menuType: 1,
        state: 1,
        orderNumber: 1,
        perms: "",
        remark: "",
        path: "/dishes-category",
        children: []
      }
    ]
  },
  {
    id: 3,
    parentId: 0,
    name: "自提点管理",
    menuType: 1,
    state: 1,
    orderNumber: 1,
    perms: "",
    remark: "",
    icon: "icon-map-pin",
    path: "/pickup-manage",
    children: []
  },
  {
    id: 4,
    parentId: 0,
    name: "团队长管理",
    menuType: 1,
    state: 1,
    orderNumber: 1,
    perms: "",
    remark: "",
    icon: "icon-account-pin-circle-line",
    path: "/leader-manage",
    children: []
  },
  {
    id: 5,
    parentId: 0,
    name: "渠道管理",
    menuType: 1,
    state: 1,
    orderNumber: 1,
    perms: "",
    remark: "",
    icon: "icon-organization-chart",
    path: "/channel-manage",
    children: []
  },
  {
    id: 6,
    parentId: 0,
    name: "财务管理",
    menuType: 1,
    state: 1,
    orderNumber: 1,
    perms: "",
    remark: "",
    icon: "icon-copper-coin-line",
    path: "/finance-manage",
    children: [
      {
        id: 6.1,
        parentId: 0,
        name: "资产明细",
        menuType: 1,
        state: 1,
        orderNumber: 1,
        perms: "",
        remark: "",

        path: "/asset-detail",
        children: []
      },
      {
        id: 6.2,
        parentId: 0,
        name: "用户资产",
        menuType: 1,
        state: 1,
        orderNumber: 1,
        perms: "",
        remark: "",

        path: "/user-asset",
        children: []
      },
      {
        id: 6.3,
        parentId: 0,
        name: "充值记录",
        menuType: 1,
        state: 1,
        orderNumber: 1,
        perms: "",
        remark: "",

        path: "/recharge-record",
        children: []
      },
      {
        id: 6.4,
        parentId: 0,
        name: "退款记录",
        menuType: 1,
        state: 1,
        orderNumber: 1,
        perms: "",
        remark: "",

        path: "/refund-record",
        children: []
      }
    ]
  },
  {
    id: 7,
    parentId: 0,
    name: "用户管理",
    menuType: 1,
    state: 1,
    orderNumber: 1,
    perms: "",
    remark: "",
    icon: "icon-user-5-line",
    path: "/user-manage",
    children: [
      {
        id: 7.1,
        parentId: 0,
        name: "用户列表",
        menuType: 1,
        state: 1,
        orderNumber: 1,
        perms: "",
        remark: "",

        path: "/user-list",
        children: []
      },
      {
        id: 7.2,
        parentId: 0,
        name: "黑名单",
        menuType: 1,
        state: 1,
        orderNumber: 1,
        perms: "",
        remark: "",

        path: "/black-list",
        children: []
      }
    ]
  },
  {
    id: 8,
    parentId: 0,
    name: "反馈列表",
    menuType: 1,
    state: 1,
    orderNumber: 1,
    perms: "",
    remark: "",
    icon: "icon-question",
    path: "/feedback-list",
    children: []
  },
  {
    id: 9,
    parentId: 0,
    name: "平台配置",
    menuType: 1,
    state: 1,
    orderNumber: 1,
    perms: "",
    remark: "",
    icon: "icon-paint-brush-line",
    path: "/platform-config",
    children: []
  },
  {
    id: 10,
    parentId: 0,
    name: "成员管理",
    menuType: 1,
    state: 1,
    orderNumber: 1,
    perms: "",
    remark: "",
    icon: "icon-team-2",
    path: "/member-manage",
    children: [
      {
        id: 10.1,
        parentId: 0,
        name: "成员列表",
        menuType: 1,
        state: 1,
        orderNumber: 1,
        perms: "",
        remark: "",

        path: "/member-list",
        children: []
      },
      {
        id: 10.2,
        parentId: 0,
        name: "岗位管理",
        menuType: 1,
        state: 1,
        orderNumber: 1,
        perms: "",
        remark: "",

        path: "/position-manage",
        children: []
      },
      {
        id: 10.3,
        parentId: 0,
        name: "部门管理",
        menuType: 1,
        state: 1,
        orderNumber: 1,
        perms: "",
        remark: "",

        path: "/dept-manage",
        children: []
      },
      {
        id: 10.4,
        parentId: 0,
        name: "公司/机构",
        menuType: 1,
        state: 1,
        orderNumber: 1,
        perms: "",
        remark: "",

        path: "/company-org",
        children: []
      }
    ]
  },
  {
    id: 11,
    parentId: 0,
    name: "系统管理",
    menuType: 1,
    state: 1,
    orderNumber: 1,
    perms: "",
    remark: "",
    icon: "icon-settings-3",
    path: "/system-manage",
    children: [
      {
        id: 11.1,
        parentId: 0,
        name: "角色管理",
        menuType: 1,
        state: 1,
        orderNumber: 1,
        perms: "",
        remark: "",
        path: "/role-manage",
        children: []
      },
      {
        id: 11.2,
        parentId: 0,
        name: "权限管理",
        menuType: 1,
        state: 1,
        orderNumber: 1,
        perms: "",
        remark: "",
        path: "/permis-manage",
        children: []
      },
      {
        id: 11.3,
        parentId: 0,
        name: "用户日志",
        menuType: 1,
        state: 1,
        orderNumber: 1,
        perms: "",
        remark: "",
        path: "/user-log",
        children: []
      },
      {
        id: 11.4,
        parentId: 0,
        name: "操作日志",
        menuType: 1,
        state: 1,
        orderNumber: 1,
        perms: "",
        remark: "",
        path: "/operate-log",
        children: []
      }
    ]
  }
];
