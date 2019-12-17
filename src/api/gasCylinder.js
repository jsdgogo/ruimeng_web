import request from '@/utils/request'

export default {
  getPageList(index, size, search, beginTime, endTIme) {
    return request({
      url: '/gasCylinder/findByPage',
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
      url: '/gasCylinder/deleteById',
      method: 'get',
      params: { id }
    })
  },
  save(gasCylinder) {
    return request({
      url: '/gasCylinder/save',
      method: 'post',
      data: gasCylinder
    })
  },
  getById(id) {
    return request({
      url: '/gasCylinder/getById',
      method: 'get',
      params: { id }
    })
  },
  update(teacher) {
    return request({
      url: '/gasCylinder/update',
      method: 'post',
      data: teacher
    })
  }
}
