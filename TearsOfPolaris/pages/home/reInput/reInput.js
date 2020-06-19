// pages/home/reInput/reInput.js
import {
  sendReInput
} from '../../../utils/network/home.js'

import {
  showFalseToast,
  showTrueToast
} from '../../../assets/js/common.js'

const app = getApp()
const globalData = app.globalData
var timeFormat = require('../../../utils/timeFormat.js')

Page({

  data: {
    date: '',
    startDate: '',
    endDate: '',

    // 表单验证
    apply_order_idFlag: false,
    countFlag: false,
    flag: false,

    // // 网络请求参数
    apply_order_id: '',
    reInput_id: '',
    reInput_count: ''

  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  btnClick() {
    if (!this.data.flag) {
      showFalseToast()
    } else {
      // 生成订单号
      const reInput_id = timeFormat.getOrderId()
      this.setData({
        reInput_id
      })
      // 将数据发送到后台
      sendReInput(globalData.token, this.data.apply_order_id, this.data.reInput_id, this.data.reInput_count, this.data.date)
        .then(res => {
          console.log(res.ErrMsg)
          if (res.ErrCode == 0) {
            showTrueToast()
          } else {
            showFalseToast()
          }
        })
    }
  },

  apply_order_id_no_focus(e) {
    // console.log(e.detail)
    this.setData({
      apply_order_idFlag: e.detail.flag,
      apply_order_id: e.detail.value
    })
  },
  count_no_focus(e) {
    // console.log(e.detail)
    this.setData({
      countFlag: e.detail.flag,
      reInput_count: e.detail.value
    })
  },
  formsubmit() {
    // console.log('formsumbit')
    let flag = this.data.apply_order_idFlag && this.data.countFlag
    // console.log(flag)
    if (flag) {
      this.setData({
        flag
      })
    }
  },

  onLoad(options) {
    const DATE = timeFormat.formatDate(new Date())
    const endDate = timeFormat.dateLater(DATE, 7)

    this.setData({
      date: DATE,
      startDate: DATE,
      endDate
    })
  },

})