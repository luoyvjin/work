import axios from "axios";
import { message } from "antd";

const service = axios.create({
  // 请求接口地址
  baseURL: "https://react-shopping-cart-67954.firebaseio.com",
  // 设置延迟时间
  timeout: 3000,
});

// 响应拦截
service.interceptors.response.use(
  (res) => {
    const { status } = res;
    //   console.log( status)

    if (status === 400) {
      message.error("");
      Promise.reject();
    }

    if (status === 200 || status === 201) {
      message.success("");
      return res;
    } else {
      message.error("");
      return res;
    }
  },
  (error) => {
    message.error("");
    return Promise.reject("响应出错", error);
  }
);

export default service;
