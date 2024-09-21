import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";
import qs from "qs";
import { PageRequest } from "../interface";
import { AssetsDetail } from "../interface/assets-detail.ts";

export const get_assets_detail_list = (params:AssetsDetail.ListParams) => {
    if (params.state === -1) delete params.state;
    return http.post<AssetsDetail.ListResponse>(
        PORT1 + `/account/assets/capitalDetail`,
        params
    );
}