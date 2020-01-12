import request from '@/utils/request'

export default {
  getPageList(index, size, search, beginTime, endTime) {
    return request({
      url: '/bill/findByPage',
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
      url: '/bill/deleteById',
      method: 'get',
      params: { id }
    })
  },
  save(bill) {
    return request({
      url: '/bill/save',
      method: 'post',
      data: bill
    })
  },
  getById(id) {
    return request({
      url: '/bill/getById',
      method: 'get',
      params: { id }
    })
  },
  update(bill) {
    return request({
      url: '/bill/update',
      method: 'post',
      data: bill
    })
  },
  exportBill(beginTime, endTime, search) {
    return request({
      url: '/bill/exportBill',
      method: 'get',
      params: {
        beginTime,
        endTime,
        search
      }
    })
  },
  getDetails(id) {
    return request({
      url: '/bill/getDetails',
      method: 'get',
      params: {
        id
      }
    })
  }
}
