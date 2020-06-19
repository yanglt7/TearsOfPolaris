// pages/profile/feedback/feedback/feedback-commit.js
Page({
  data: {
    showTopTips: false,
    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,
    commit_title: '',

    // 表单验证
    textareaFlag: false,
    phoneFlag: false,
    flag: false
  },

  bindCountryCodeChange: function(e) {
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryCodeIndex: e.detail.value
    })
  },

  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },

  btnClick() {
    if (!this.data.flag) {
      wx.showToast({
        title: '提交失败',
        image: "/assets/img/toast/error.png",
        mask: true,
        success: () => {
          setTimeout(() => {
            wx.hideToast()
          }, 1500)
        }
      })
    } else {
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        mask: true,
        success: () => {
          setTimeout(() => {
            wx.navigateTo({
              url: "/pages/profile/feedback/feedback-commit/commit-success/commit-success",
            })
          }, 500)
        }
      })
    }
  },

  // 表单验证
  textarea_no_focus(e) {
    // console.log(e.detail)
    this.setData({
      textareaFlag: e.detail.flag
    })
  },
  phone_no_focus(e) {
    console.log(e.detail)
    let value = e.detail.value
    if (value) {
      this.setData({
        phoneFlag: true
      })
    }
  },
  formsubmit() {
    console.log('formsumbit')
    let flag = this.data.textareaFlag && this.data.phoneFlag
    // console.log(flag)
    if (flag) {
      this.setData({
        flag
      })
    }
  },

  // 获取页面跳转传递过来的commit_title
  onLoad(options) {
    wx.showNavigationBarLoading()

    this.setData({
      commit_title: options.title
    })
  },

  onReady() {
    wx.hideNavigationBarLoading()
  }
});