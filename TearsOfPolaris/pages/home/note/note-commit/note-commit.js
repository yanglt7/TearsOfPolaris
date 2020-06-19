// pages/home/note/note-commit/note-commit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  handleNavigate() {
    wx.reLaunch({
      url: "/pages/home/home"
    })
  }
})