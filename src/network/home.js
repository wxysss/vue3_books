import {
  request
} from "./request";
// 获取首页全部数据
export function getHomeAllData(params) {
  return request({
    url: '/api/index',
    // methods: 'GET',
    // params: {

    // }
  })
}
// 获取首页商品数据
export function getHomeGoods(type = 'sales', page = 1) {
  return request({
    url: '/api/index?' + type + '=1&page=' + page,
    // methods: 'GET',
    // params: {

    // }
  })
}