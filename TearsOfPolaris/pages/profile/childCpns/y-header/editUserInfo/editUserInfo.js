// pages/profile/childCpns/y-header/editUserInfo/editUserInfo.js
const app = getApp()
const globalData = app.globalData
import {
  AVATARURL,
  CITY,
  GENDER,
  NICKNAME,
  PROVINCE
} from '../../../../../assets/js/const.js'

import {
  sendUserInfo
} from '../../../../../utils/network/profile.js'

import {
  showFalseToast,
  showTrueToast
} from '../../../../../assets/js/common.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: wx.getStorageSync(AVATARURL),
    city: wx.getStorageSync(CITY),
    gender: wx.getStorageSync(GENDER),
    nickName: wx.getStorageSync(NICKNAME),
    province: wx.getStorageSync(PROVINCE),

    identity: ["校内学生", "校内教职工", "校外人员"],
    identityIndex: 0,
    user_name: '',
    user_id: 123456,
    email: '',
  },

  bindIdentityChange(e) {
    console.log('picker idengtity 发生选择改变，携带值为', e.detail.value);

    this.setData({
      identityIndex: e.detail.value
    })
  },

  name_no_focus(e) {
    // console.log(e.detail.value)
    this.setData({
      user_name: e.detail.value
    })
  },

  user_id_no_focus(e) {
    this.setData({
      user_id: e.detail.value
    })
  },

  email_no_focus(e) {
    this.setData({
      email: e.detail.value
    })
  },

  onSave() {
    console.log('保存个人信息')

    // username, identity, userid, email
    sendUserInfo(globalData.token, this.data.user_name, this.data.identity[this.data.identityIndex], this.data.user_id, this.data.email)
      .then(res => {
        console.log(res.ErrMsg)
        if (res.ErrCode == 0) {
          wx.navigateTo({
            url: "/pages/profile/childCpns/y-header/saveUserInfo/saveUserInfo"
          })
        } else {
          showFalseToast()
        }
      })
  },

  onLoad() {
    wx.showNavigationBarLoading()
  },

  onReady() {
    wx.hideNavigationBarLoading()
  }

})