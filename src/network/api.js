import {request} from "network/request"

export function requestLogin(username, password) {
  return request({
    method:"post",
    url: '/login',
    data: {
      username,
      password,
    }
  })
}
