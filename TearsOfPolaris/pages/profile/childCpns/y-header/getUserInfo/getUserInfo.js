// pages/profile/childCpns/y-header/getUserInfo/getUserInfo.js
const app = getApp()
const globalData = app.globalData
import {
  AVATARURL,
  CITY,
  GENDER,
  NICKNAME,
  PROVINCE
} from '../../../../../assets/js/const.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  onGetUserInfo(e) {
    console.log(e)
    const data = e.detail.userInfo
    const dataObj = {
      AVATARURL: data.avatarUrl,
      CITY: data.city,
      GENDER: data.gender,
      NICKNAME: data.nickName,
      PROVINCE: data.province
    }

    // 存入globalData
    globalData.avatarUrl = data.avatarUrl
    globalData.city = data.city
    globalData.gender = data.gender
    globalData.nickName = data.nickName
    globalData.province = data.province

    // 进行本地存储
    for (let key in dataObj) {
      // console.log(key, dataObj[key])
      wx.setStorageSync(key, dataObj[key])
    }
  },

  navigateToEdit() {
    wx.navigateTo({
      url: '/pages/profile/childCpns/y-header/editUserInfo/editUserInfo'
    })
  },

  onLoad() {
    wx.showNavigationBarLoading()
  },

  onReady() {
    wx.hideNavigationBarLoading()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})