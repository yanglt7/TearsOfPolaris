// pages/profile/childCpns/y-header/saveUserInfo/saveUserInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg_title: "修改成功"
  },
  handleNavigate() {
    wx.reLaunch({
      url: '/pages/profile/profile'
    })
  }
  
})