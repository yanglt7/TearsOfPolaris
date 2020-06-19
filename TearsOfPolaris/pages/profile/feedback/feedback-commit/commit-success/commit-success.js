// pages/profile/feedback/feedback-commit/msg-success/commit-success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad() {
    wx.showNavigationBarLoading()
  },

  onReady() {
    wx.hideNavigationBarLoading()
  },

  handleNavigate() {
    wx.reLaunch({
      url: "/pages/home/home"
    })
  }
})