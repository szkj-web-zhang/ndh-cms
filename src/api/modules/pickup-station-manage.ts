import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";
import qs from "qs";
import { PageRequest } from "../interface";
import { PickUpStation } from "../interface/pickup-station-manage";

export const get_pickup_station_list = (params:PickUpStation.ListParams) => {
    if (params.status === -1) delete params.status;
    return http.post<{ pageUtils: PickUpStation.ListResponse }>(
        PORT1 + `/pickupStationCms/dataList`,
        params
    );
}