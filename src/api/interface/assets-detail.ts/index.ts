import { PageRequest, PageResponse } from "..";
export namespace AssetsDetail {

    //列表入参
    export interface ListParams {
        page: number; 
        pageSize: number;
        state?:number;
        strDate?:string; 
        endDate?:string; 
        strTrDate?:string; 
        endTrDate?:string; 
        keyword?:string; 
    } 

    //列表对象
    export interface ItemData {
        recordId			:string;  	//记录id
        accountUuid 		:string;	//用户uuid
        changeAmount 		:string;	//交易金额
        recordType 			:number;	//记录类型 1:支付 2:扣款  3:充值  4:退款 5:后端充值
        transNo 			:string;	//关联订单
        status 				:number;	//0:失败 1:成功
        createTime 			:string;	//下单时间
        createTrTime 		:string;	//交易时间
        nickName 			:string;	//用户昵称
        headPortrait 		:string;	//用户头像
        operateNickName 	:string;	//操作人昵称
        operateHeadPortrait :string;	//操作人头像
        operateUserUuid 	:string;	//操作人uuid
        operateDidSymbol 	:string;	//操作人did
        orderPayNo 			:string;	//流水号
        orderType 			:number;	//订单类型 1:社区团购
        didSymbol 			:string;	//用户did
    }

    // 响应数据
    export interface ListResponse extends PageResponse {
        list: ItemData[];
    }
}