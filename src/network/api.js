import {request} from "network/request"

export function requestLogin(username, password) {
  return request({
    method: "post",
    url: '/login',
    data: {
      username,
      password,
    }
  })
}

export function requestGetAllUsers() {
  return request({
    method: "get",
    url: '/api/allUsers'
  })
}

export function requestDeleteUser(username) {
  return request({
    method: "delete",
    url: '/api/deleteUser',
    params: {
      username
    }
  })
}

export function requestUpdateUserInfo(newUserInfo) {
  return request({
    method: "post",
    url: '/api/updateUserInfo',
    data: {
      name: newUserInfo.name,
      password: newUserInfo.password,
      mail: newUserInfo.mail,
      birthday: newUserInfo.birthday,
      balance: newUserInfo.balance
    }
  })
}

export function requestSendPhoneVerCode(mobile) {
  return request({
    method: "post",
    url: '/api/sendVerCode',
    params: {
      mobile
    }
  })
}

export function requestRegister(username, mobile, password, verCode) {
  return request({
    method: "post",
    url: '/register',
    params: {
      username,
      mobile,
      password,
      verCode,
    }
  })
}

export function requestOauthByGitHub() {
  return request({
    url: '/oauth/github',
  })
}

export function postOauthInfoOfGitHub(authInfo) {
  return request({
    url: '/oauth/github/authInfo',
    params: {
      code: authInfo.code,
      state: authInfo.state
    }
  })
}

export function requestUpdateBaseInfo(nickname, mail, birthday) {
  return request({
    url: '/api/updateBaseInfo',
    method: "Post",
    params: {nickname, mail, birthday}
  })
}

export function requestUpdatePassword(oldPassword, newPassword) {
  return request({
    url: '/api/updatePassword',
    method: "Post",
    params: {oldPassword, newPassword}
  })
}

export function requestGetArticleStatisticalInfo() {
  return request({
    url: '/api/getArticleStatisticalInfo',
  })
}

export function requestGetArticles(id) {
  return request({
    url: '/api/getArticles',
    method:"Post",
    params: {id}
  })
}

export function requestPostNewArticle(username,title,content,tags) {
  return request({
    url: '/api/uploadNewArticle',
    method:"Post",
    params: {username,title,content,tags}
  })
}

export function requestUpdateArticle(id,title,content,tags) {
  return request({
    url: '/api/updateArticle',
    method:"Post",
    params: {id,title,content,tags}
  })
}

export function requestDeleteArticle(id) {
  return request({
    url: '/api/deleteArticle',
    method:"Post",
    params: {id}
  })
}



