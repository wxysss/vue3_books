import axios from 'axios'
import { Notify } from 'vant';
export function request(config) {
  const instance = axios.create({
    baseURL: 'https://api.shop.eduwork.cn',
    timeout: 5000
  })
  // 请求拦截
  instance.interceptors.request.use(config => {
    // 如果有一些接口需要认证才能访问，就在这里统一设置
    // 否则return config直接放行
    return config
  }, err => {

  })

  // 响应拦截
  instance.interceptors.response.use(res => {
    // 通常直接放行
    return res.data ? res.data : res

  }, err => {
    // 有需要授权才可以访问的接口，统一去login授权

    // 如果有错误，这里面会去处理，显示错误信息
    Notify(err.response.data);
    console.log('err', err.response.data.errors[Object.keys(err.response.data.errors)][0]);
  })
  return instance(config)
}