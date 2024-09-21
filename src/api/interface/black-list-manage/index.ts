import { PageRequest, PageResponse } from "..";
export namespace BlackList {

    //列表入参
    export interface ListParams {
        page: number; 
        pageSize: number; 
    } 

    //列表对象
    export interface ItemData {
        
    }

    // 响应数据
    export interface ListResponse extends PageResponse {
        list: ItemData[];
    }
}