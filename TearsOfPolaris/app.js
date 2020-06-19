import {
  TOKEN
} from './assets/js/const.js'

import {
  Login,
  Auth
} from './utils/network/app.js'

App({

  globalData: {
    token: '',

    // userInfo
    avatarUrl: '',
    city: '',
    country: 'China',
    gender: 1,
    nickName: '',
    provice: ''
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch() {

    // 登录操作
    // 1.先从缓存中取出token
    const token = wx.getStorageSync(TOKEN)

    // 2.判断token是否有值
    if (token && token.length !== 0) { // 已经有token, 验证token是否过期
      // 验证token是否过期
      this.check_token(token)
    } else { // 没有token, 进行登录操作
      this.login()
    }
  },

  check_token(token) {
    console.log('执行了登录验证操作')
    Auth(token).then(res => {
      console.log(res)
      if (res.ErrCode == 0) {
        console.log('token有效')
        this.globalData.token = token
      } else {
        this.login()
      }
    })
  },

  login() {
    console.log('执行了登录操作')
    wx.login({
      // code只有五分钟的有效期
      success: res => {
        // 1.获取code
        const code = res.code
        console.log(code)

        // 2.将code发送给我们的服务器
        Login(code).then(res => {
          console.log(res)
          if (res.ErrCode == 0) {
            // 1.取出token
            const token = res.Token

            // 2.将token保存到globalData中
            this.globalData.token = token

            // 3.进行本地存储
            wx.setStorageSync(TOKEN, token)
          }
        })
      }
    })
  }
})