import request from '@/utils/request'

export default {
  getPageList(index, size, search, beginTime, endTIme) {
    return request({
      url: '/emptyBottle/findByPage',
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
      url: '/emptyBottle/deleteById',
      method: 'get',
      params: { id }
    })
  },
  save(emptyBottle) {
    return request({
      url: '/emptyBottle/save',
      method: 'post',
      data: emptyBottle
    })
  },
  getById(id) {
    return request({
      url: '/emptyBottle/getById',
      method: 'get',
      params: { id }
    })
  },
  update(teacher) {
    return request({
      url: '/emptyBottle/update',
      method: 'post',
      data: teacher
    })
  }
}
