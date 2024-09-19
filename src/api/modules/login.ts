import http from "@/api";
import qs from "qs";
import { Login, Menu, User } from "@/api/interface/login/index";
import { PORT1 } from "@/api/config/servicePort";

// 密码登录
export const qrcode_get = () => {
  return http.post<Login.QRcodeResponse>(
    PORT1 + `/cmsAccount/getLoginCode`,
    {},
    { loading: false }
  );
};

// 发送验证码
export const send_sms_code = (params: Login.SendCodeParams) => {
  return http.post(PORT1 + `/cmsAccount/regCaptcha`, qs.stringify(params), {
    loading: false
  });
};

// 验证码登录
export const sms_code_login = (params: Login.CodeLoginParams) => {
  return http.post<User.Response>(
    PORT1 + `/cmsAccount/loginByCode`,
    qs.stringify(params),
    {
      loading: false
    }
  );
};

// 获取角色权限列表
export const auth_list_get = () => {
  return http.get<Menu.Response>(
    PORT1 + `/cmsAccount/getUserPermission`,
    {},
    {
      loading: false
    }
  );
};
