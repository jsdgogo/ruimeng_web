import request from '@/utils/request'

export default {
  getPageList(index, size, search, beginTime, endTime) {
    return request({
      url: '/customer/findByPage',
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
      url: '/customer/deleteById',
      method: 'get',
      params: { id }
    })
  },
  save(customer) {
    return request({
      url: '/customer/save',
      method: 'post',
      data: customer
    })
  },
  getById(id) {
    return request({
      url: '/customer/getById',
      method: 'get',
      params: { id }
    })
  },
  update(customer) {
    return request({
      url: '/customer/update',
      method: 'post',
      data: customer
    })
  }
}
