import request from './network.js'

export function Login(code) {
  return request({
    url: '/login',
    data: {
      code
    },
    header: {
      "Content-Type": 'application/x-www-form-urlencoded'
    },
    method: 'post'
  })
}

export function Auth(token) {
  return request({
    url: '/auth',
    header: {
      "Content-Type": 'application/x-www-form-urlencoded'
    },
    data: {
      token
    },
    method: 'post'
  })
}