import request from 'request'
import Config from '../config';
import {buildApiRequest} from "~/api/init";

// export default {
//     login: (p,c) => A(p,'/auth/login','post',c),
//     getUserInfo: (c) => A(null,'/user/userInfo','get',c),
// }

export function login(data) {
  return buildApiRequest(
    '/auth/login',
    'post',
    data
  )
}

// export function login(data) {
//   return request({
//     url: Config.apiUrl + '/auth/login',
//     method: 'POST',
//     data: data
//   })
// }

//
// export function logout() {
//   return request({
//     url: '/login/logout',
//     method: 'post'
//   })
// }
//
export function getUserInfo() {
  return buildApiRequest(
    '/auth/userInfo',
    'get',
    null
  )
}

