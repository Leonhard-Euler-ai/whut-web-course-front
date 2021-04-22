import axios from 'axios'
import {Message} from 'element-ui';


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
    if(res.data.code!==200){
      Message.error({
        showClose: true,
        message: res.data.message
      });
    }
    return res;
  }, err => {
    console.log(err);
    Message.error({
      showClose: true,
      message: err.response ? err.response.data.message : '网络错误'
    });
  })

  return instance(config)
}
