import {
  request
} from "./request";
export function getCategory(params) {
  return request({
    url: '/api/goods',
    // methods: 'GET',
    // params: {

    // }
  })
}
export function getCategoryGoods(order='sales',cid = 0,page=1) {
  return request({
    url: '/api/goods?category_id='+cid+'&page='+page+'&'+order+'=1',
    // methods: 'GET',
    // params: {

    // }
  })
}