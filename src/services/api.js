import request from '../utils/request'

export function getProducts (data) {
  return request({
    url: '/products.json',
    method: 'get',
    data
  })
}