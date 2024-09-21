import { PageRequest, PageResponse } from "..";

export namespace Channel {
    //列表入参
    export interface ListParams {
        page: number; 
        pageSize: number; 
        searchKey?: string;
    } 

    //列表对象
    export interface ItemData {
        phoneNumber			: string;	//手机号
        didSymbol			: string;	//实名DID标识
        teamLeaderCount		: string;	//团队长人数
        opearteSumAmount	: string;	//渠道下普通用户总消费(团队总消费需加上团队长总消费)
        teamLeaderSumAmount	: string;	//团队长总消费
        nickName			: string;	//昵称
        accountUuid			: string;	//渠道商用户uuid
        operateAccountCount	: string;	//渠道下普通用户总数量(团队人数需加上团队长人数)
        headPortrait		: string;	//头像
    }

    // 菜品列表响应数据
    export interface ListResponse extends PageResponse {
        list: ItemData[];
    } 
}