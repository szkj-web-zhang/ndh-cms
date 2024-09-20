import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";
import qs from "qs";

export const upload_images = (params: FormData) => {
  return http.post<string>(PORT1 + `/file/multiUpload`, params, {
    cancel: false
  });
};
