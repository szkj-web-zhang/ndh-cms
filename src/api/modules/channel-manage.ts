import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";
import qs from "qs";
import { PageRequest } from "../interface";
import { Channel } from "../interface/channel-manage";

export const get_channel_list = (params:Channel.ListParams) => {
    return http.post<{ pageUtils: Channel.ListResponse }>(
        PORT1 + `/operate/dataList`,
        params
    );
}