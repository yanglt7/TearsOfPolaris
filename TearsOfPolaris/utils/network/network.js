import {
  baseURL,
  timeout
} from '../../assets/js/const.js'

function request(options) {
  wx.showLoading({
    title: '加载中...',
  })

  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      timeout: timeout,
      header: options.header,
      data: options.data,
      method: options.method,
      success: res => {
        resolve(res.data)
      },
      fail: reject,
      complete: res => {
        wx.hideLoading()
      }
    })
  })
}

export default request;