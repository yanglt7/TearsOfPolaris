// components/y-msg/y-msg-success.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    msg_title: {
      type: String,
      value: '提交成功'
    },
    desc: {
      type: String,
      value: '您的反馈已成功提交，开发人员将尽快处理，请留意工作人员短信或电话通知'
    },
    btn_title: {
      type: String,
      value: '返回首页'
    },
    plain: {
      type: String,
      value: false
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleNavigate() {
      console.log('handleNavigate')
      // wx.reLaunch({
      //   url: '/pages/home/home'
      // })
      this.triggerEvent('handleNavigate', {}, {})
    }
  }
})
