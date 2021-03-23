import axios from 'axios'

axios.defaults.withCredentials = true

export function request(config) {
  //创建axios实例
  const instance = axios.create(
    {
      baseURL: 'http://localhost:8181',
      timeout: 10000,
      crossDomain: true,
    }
  )

  //请求拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log("请求拦截器中的err: " + err);
  })

  //响应拦截器
  instance.interceptors.response.use(res => {
    return res;
  }, err => {
    console.log("响应拦截器拦截到的err"+err);
  })

  return instance(config)
}
