import request from '@/utils/request'

export default {
  getPageList(index, size, search, beginTime, endTIme) {
    return request({
      url: '/customerEmptyBottle/findByPage',
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
      url: '/customerEmptyBottle/deleteById',
      method: 'get',
      params: { id }
    })
  },
  save(customerEmptyBottle) {
    return request({
      url: '/customerEmptyBottle/save',
      method: 'post',
      data: customerEmptyBottle
    })
  },
  getById(id) {
    return request({
      url: '/customerEmptyBottle/getById',
      method: 'get',
      params: { id }
    })
  },
  update(customerEmptyBottle) {
    return request({
      url: '/customerEmptyBottle/update',
      method: 'post',
      data: customerEmptyBottle
    })
  },
  exportCEB(beginTime, endTime, search) {
    return request({
      url: '/customerEmptyBottle/exportCEB',
      method: 'get',
      params: {
        beginTime,
        endTime,
        search
      }
    })
  }
}
