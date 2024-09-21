import { PageRequest, PageResponse } from "..";
export namespace Users {

    //列表入参
    export interface ListParams {
        page: number; 
        pageSize: number; 
        keyword?: string;
        state?: number | null; 
    } 

    //列表对象
    export interface ItemData {
        id  				: string;	//id
        phoneNumber			: string;	//手机号	
        uuid 				: string;	//用户uuid
        headPortrait  		: string;	//用户头像
        nickName 			: string;	//用户昵称
        registerTime 		: string;	//注册时间
        blacklist 			: number;	//用户状态 1:正常 2:黑名单 3:已注销
        identity 			: number;	//用户标识 0:临时账户   1:普通用户  2:团长 3:渠道负责人
        parentUuid 			: string;	//上级uuid
        parentNickName 		: string;	//上级昵称
        parentHeadPortrait 	: string;	//上级头像
        didSymbol 			: string;	//用户did
        remark 				: string;	//备注
        count 				: string;	//总下单
    }

    // 响应数据
    export interface ListResponse extends PageResponse {
        list: ItemData[];
    }
}