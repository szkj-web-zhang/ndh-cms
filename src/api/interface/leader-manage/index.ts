import { PageRequest, PageResponse } from "..";

export namespace Leader {
    //列表入参
    export interface ListParams {
        page: number; 
        pageSize: number; 
        searchKey?: string;
    } 

    //列表对象
    export interface ItemData {
        accountUuid  	: string; //团队长用户uuid
        headPortrait    : string; //团队长头像
        nickName        : string; //团队长昵称
        didSymbol       : string; //团队长实名DID标识
        teamAccountUuid : string; //渠道商用户uuid
        teamHeadPortrait: string; //渠道商头像
        teamNickName    : string; //渠道商昵称
        teamDidSymbol   : string; //渠道商实名DID标识
        teamAccountNum  : string; //团队用户数量
        teamOrderNum    : string; //团队订单数量
        teamOrderAmount : string; //团队总消费金额
    }

    // 菜品列表响应数据
    export interface ListResponse extends PageResponse {
        list: ItemData[];
    } 
}