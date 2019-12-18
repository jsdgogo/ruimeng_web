import request from '@/utils/request'

export function login(loginName, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      loginName,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
export function update(user) {
  return request({
    url: '/user/update',
    method: 'post',
    data: {
      user
    }
  })
}
export function toIndex(user) {
  return request({
    url: '/user/toIndex',
    method: 'post'
  })
}

