import { PageRequest, PageResponse } from "..";
export namespace PickUpStation {

    //列表入参
    export interface ListParams {
        page: number; 
        pageSize: number; 
        searchKey?: string;
        status?: number | null; 
    } 

    //列表对象
    export interface ItemData {
        stationCode	: string; //自提点编号
        accountNum	: string; //总人数
        stationDesc	: string;   //描述
        nickName	: string;   //昵称
        regionName	: string;   //地区名称
        accountUuid	: string;   //用户uuid
        orderNum    : string;   //订单总量
        todayOrderNum: string;  //今日订单
        stationAddres: string;  //地址
        isEnable	: string;   //自提点权限 1:启用   0：禁用
        personName	: string;   //自提点负责人名称(编辑用)
        personPhone	: string;   //自提点负责人手机号(编辑用)
        regionId	: string;   //地区id
        stationStatus: number;  //营业状态 0:歇业 1:营业
        stationName	: string;   //自提点名称
        location	: string;   //经纬度(编辑用)
        stationLogo	: string;   //自提点图片
        headPortrait: string;   //头像
        stationId	: string;   //自提点id
    }

    // 菜品列表响应数据
    export interface ListResponse extends PageResponse {
        list: ItemData[];
    }
}