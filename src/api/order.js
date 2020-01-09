import request from '@/utils/request'

export default {
  getPageList(index, size, search, beginTime, endTime) {
    return request({
      url: '/order/findByPage',
      method: 'post',
      data: {
        index,
        size,
        search,
        beginTime,
        endTime
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
  },
  exportOrder(beginTime, endTime) {
    return request({
      url: '/order/exportOrder',
      method: 'get',
      params: {
        beginTime,
        endTime
      }
    })
  }
}
