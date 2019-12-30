import request from '@/utils/request'

export default {
  getPageList(index, size, search, beginTime, endTIme) {
    return request({
      url: '/order/findByPage',
      method: 'post',
      data: {
        index,
        size,
        search,
        beginTime,
        endTIme
      }
    })
  },
  removeById(id) {
    return request({
      url: '/order/deleteById',
      method: 'get',
      params: { id }
    })
  },
  save(order) {
    return request({
      url: '/order/save',
      method: 'post',
      data: {
        orderInfo: order
      },
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  },
  getById(id) {
    return request({
      url: '/order/getById',
      method: 'get',
      params: { id }
    })
  },
  update(order) {
    return request({
      url: '/order/update',
      method: 'post',
      data: {
        orderInfo: order
      },
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
}
