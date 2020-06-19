// pages/home/apply/apply.js
import {
  sendApply
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
    // tapIndex: 0,

    // 纯度 - 普通选择器
    purity_array: ['化学纯', '分析纯', '优级纯', '基准', '光谱纯', '其他'],
    purity_index: 0,

    // 用途 - 普通选择器
    use_array: ['教学', '科研', '社会服务', '其他'],
    use_index: 0,

    date: '',
    startDate: '',
    endDate: '',

    // 表单验证
    nameFlag: false,
    idFlag: false,
    checkidFlag: false,
    casFlag: false,
    specsFlag: false,
    countFlag: false,
    flag: false,

    // 网络请求参数
    order_id: '',
    apply_name: '',
    apply_id: '',
    addr: '丰盛堂A座1楼101',
    check_id: '',
    cas: '',
    specs: '',
    apply_count: '',
  },

  purityPickerChange(e) {
    console.log('purity_picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      purity_index: e.detail.value
    })
  },

  usePickerChange(e) {
    console.log('use_picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      use_index: e.detail.value
    })
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  // -----------------表单提交相关事件---------------

  name_no_focus(e) {
    // console.log(e.detail)
    this.setData({
      nameFlag: e.detail.flag,
      apply_name: e.detail.value
    })
  },
  id_no_focus(e) {
    // console.log(e.detail)
    this.setData({
      idFlag: e.detail.flag,
      apply_id: e.detail.value
    })
  },
  checkid_no_focus(e) {
    // console.log(e.detail)
    this.setData({
      checkidFlag: e.detail.flag,
      check_id: e.detail.value
    })
  },
  cas_no_focus(e) {
    // console.log(e.detail)
    this.setData({
      casFlag: e.detail.flag,
      cas: e.detail.value
    })
  },
  specs_no_focus(e) {
    // console.log(e.detail)
    this.setData({
      specsFlag: e.detail.flag,
      specs: e.detail.value
    })
  },
  count_no_focus(e) {
    // console.log(e.detail)
    this.setData({
      countFlag: e.detail.flag,
      apply_count: e.detail.value
    })
  },
  formsubmit() {
    let flag = this.data.nameFlag && this.data.idFlag && this.data.checkidFlag && this.data.casFlag && this.data.specsFlag && this.data.countFlag
    if (flag) {
      this.setData({
        flag
      })
    }
  },

  multipickerChange(e) {
    console.log(e)
    this.setData({
      addr: e.detail.value
    })
  },

  btnClick() {
    if (!this.data.flag) {
      showFalseToast()
    } else {
      // 生成订单号
      const order_id = timeFormat.getOrderId()
      this.setData({
        order_id
      })
      // 将数据发送到后台
      sendApply(globalData.token, this.data.order_id, this.data.apply_name, this.data.apply_id, this.data.addr, this.data.date, this.data.use_array[this.data.use_index], this.data.check_id, this.data.cas, this.data.purity_array[this.data.purity_index], this.data.specs, this.data.apply_count)
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const DATE = timeFormat.formatDate(new Date())
    const endDate = timeFormat.dateLater(DATE, 7)

    this.setData({
      date: DATE,
      startDate: DATE,
      endDate
    })
  },

  navigate(url) {
    wx.reLaunch({
      url
    })
  }
})