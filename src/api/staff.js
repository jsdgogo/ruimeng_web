import request from '@/utils/request'

export default {
  getPageList(index, size, search, beginTime, endTIme) {
    return request({
      url: '/staff/findByPage',
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
      url: '/staff/deleteById',
      method: 'get',
      params: { id }
    })
  },
  save(staff) {
    return request({
      url: '/staff/save',
      method: 'post',
      data: staff
    })
  },
  getById(id) {
    return request({
      url: '/staff/getById',
      method: 'get',
      params: { id }
    })
  },
  update(teacher) {
    return request({
      url: '/staff/update',
      method: 'post',
      data: teacher
    })
  }
}
