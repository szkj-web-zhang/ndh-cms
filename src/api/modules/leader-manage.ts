import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";
import qs from "qs";
import { PageRequest } from "../interface";
import { Leader } from "../interface/leader-manage";

export const get_leader_list = (params:Leader.ListParams) => {
    return http.post<{ pageUtils: Leader.ListResponse }>(
        PORT1 + `/team/dataList`,
        params
    );
}