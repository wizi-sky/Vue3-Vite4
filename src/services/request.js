import axios from "axios";
import Cookies from "js-cookie";
import { showToast } from "vant";

let BASE_INFO = {
  baseURL: import.meta.env.VITE_APP_BASE_API,
};

// 创建axios实例
const request = axios.create({
  baseURL: BASE_INFO.baseURL, // 所有的请求地址前缀部分(没有后端请求不用写)
  timeout: 30000, // 请求超时时间(毫秒)
  withCredentials: true, // 异步请求携带cookie
});

// request拦截器
request.interceptors.request.use(
  (config) => {
    let uid = Cookies.get("uid") || "";
    let token = Cookies.get("token") || "";
    const headers = {
      Authorization: "Bearer " + token,
      uid: uid,
    };

    // do something before request is sent
    config.headers = Object.assign({}, headers, config.headers);
    // if (!config.hideLoading) {
    //   showToast.loading({
    //     duration: 0,
    //     forbidClick: true,
    //   });
    // }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response 拦截器
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (response.config.noResData) {
      return res;
    }
    if (res.status !== 200) {
      if (!response.config.noError) {
        showToast({
          message: res?.error?.message || "服务器异常",
          type: "fail",
        });
      }
      return Promise.reject(res);
    } else {
      return res.data || res;
    }
  },
  (error) => {
    // 对响应错误做点什么
    console.log(error);
    showToast("服务器异常!!!");
    return Promise.reject(error);
  }
);
export default request;
