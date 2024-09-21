import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";
import qs from "qs";
import { PageRequest } from "../interface";
import { Users } from "../interface/user-manage";

export const get_user_list = (params:Users.ListParams) => {
    if (params.state === -1) delete params.state;
    return http.post<Users.ListResponse>(
        PORT1 + `/user/list`,
        params
    );
}