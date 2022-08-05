import { request } from "./request";
export  function register(data) {
  return request({
    url:'/api/auth/register',
    method:'post',
    data
  })
}

export  function login(data) {
  return request({
    url:'/api/auth/login',
    method:'post',
    data
  })
}


export  function logout(data) {
  return request({
    url:'/api/auth/logout',
    method:'post'
  })
}
// 用户详情
export  function getUser(data) {
  return request({
    url:'/api/user'
  })
}

export  function changePassword(params) {
  return request({
    url:'/api/auth/password/update',
    method:'post',
    params
  })
}
