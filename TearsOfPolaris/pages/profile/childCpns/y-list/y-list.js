// pages/profile/childCpns/y-list/y-list.js
var icon = require("../../../../assets/img/list/icon")

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

    // hd_icon
    aboutUs_img: icon.aboutUs,
    feedback_img: icon.feedback,
    message_img: icon.message,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e) {
      console.log(e)
      const id = e.detail.id
      wx.navigateTo({
        url: '/pages/profile/' + id + '/' + id,
      })
    }
  }
})