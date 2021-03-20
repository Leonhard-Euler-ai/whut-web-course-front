import axios from 'axios'
import Vue from "vue";


axios.defaults.withCredentials = true

export function request(config) {
  //创建axios实例
  const instance = axios.create(
    {
      baseURL: 'http://localhost:8080',
      timeout: 10000,
      crossDomain: true,
    }
  )

  //请求拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log("axios请求拦截器中的err: " + err);
  })

  //响应拦截器
  instance.interceptors.response.use(res => {
    return res;
  }, err => {

  })

  return instance(config)
}
