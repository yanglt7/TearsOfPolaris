// pages/profile/childCpns/y-header/y-header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    role: "普通用户"
  },

  

  /**
   * 组件的方法列表
   */
  methods: {
    onAdmin() {
      console.log('onAdmin')
    },

    getUserInfo() {
      wx.navigateTo({
        url: '/pages/profile/childCpns/y-header/getUserInfo/getUserInfo',
      })
    }
  }
})