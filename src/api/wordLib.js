import request from '@/utils/request'

export default {
  getList(index, size) {
    return request({
      url: '/wordLib/findByPage',
      method: 'post',
      data: {
        index,
        size
      }
    })
  }
}

