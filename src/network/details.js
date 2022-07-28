import {
  request
} from "./request";
// 商品详情
export function getDetail(id) {
  return request({
    url: '/api/goods/'+id,
    // methods: 'GET',
    // params: {

    // }
  })
}