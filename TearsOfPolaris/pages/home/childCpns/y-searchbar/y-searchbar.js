// pages/home/childCpns/searchbar.js
import {
  queryMsds
} from '../../../../utils/network/home.js'

const app = getApp()
const globalData = app.globalData

Component({
  properties: {
  },
  data: {
    inputShowed: false,
    inputVal: ""
  },
  methods: {
    showInput: function () {
      this.setData({
        inputShowed: true
      });
    },
    hideInput: function () {
      this.setData({
        inputVal: "",
        inputShowed: false
      });
    },
    clearInput: function () {
      this.setData({
        inputVal: ""
      });
    },
    inputTyping: function (e) {
      this.setData({
        inputVal: e.detail.value
      });
    },

    onConfirm(e) {
      // 从后端接收id和name，传给msds页面拼接URL
      queryMsds(globalData.token, this.data.inputVal).then(res => {
        console.log(res.ErrMsg)
        if (res.ErrCode == 0) {
          // 处理数据
          this.__handleData(res)
        } else {
          console.log('数据发送出错')
          wx.showToast({
            title: '查询失败',
            image: "/assets/img/toast/error.png",
            mask: true,
            success: () => {
              setTimeout(() => {
                wx.hideToast()
              }, 1500)
            }
          })
        }
      })
    },

    __handleData(res) {
      const id = res.Id
      const name = res.Name
      const cas = this.data.inputVal
      const data = { id, name, cas }
      wx.navigateTo({
        url: '/pages/home/msds/msds',
        success: res => {
          res.eventChannel.emit('msds', data)
        }
      })
    }
  }
  
})