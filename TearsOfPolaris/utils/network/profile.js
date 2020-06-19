import request from './network.js'

export function sendUserInfo(token, user_name, identity, user_id, email) {
  return request({
    url: '/senduserinfo',
    data: {
      token,
      user_name,
      identity,
      user_id,
      email
    },
    header: {
      "Content-Type": 'application/x-www-form-urlencoded'
    },
    method: 'post'
  })
}