// pages/home/storage/storage.js
import {
  queryStorage
} from '../../../utils/network/home.js'

import {
  showFalseToast
} from '../../../assets/js/common.js'

const app = getApp()
const globalData = app.globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 纯度 - 普通选择器
    purity_array: ['化学纯', '分析纯', '优级纯', '基准', '光谱纯', '其他'],
    purity_index: 0,


    // 表单验证
    casFlag: false,
    specsFlag: false,
    flag: false,

    // 网络请求参数
    cas: '',
    specs: ''
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

  purityPickerChange(e) {
    console.log('purity_picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      purity_index: e.detail.value
    })

  },

  formsubmit() {
    let flag = this.data.casFlag && this.data.specsFlag
    // console.log(flag)
    if (flag) {
      this.setData({
        flag
      })
    }
  },

  btnClick() {
    if (!this.data.flag) {
      showFalseToast("查询失败")
    } else {
      // 将数据发送到后台
      queryStorage(globalData.token, this.data.cas, this.data.purity_array[this.data.purity_index], this.data.specs)
        .then(res => {
          console.log(res.ErrMsg)
          if (res.ErrCode == 0) {
            // 页面间数据传递 storage -> storage-commit
            this.__handleDataTrans(res.Storage_data)
          } else {
            showFalseToast('查询失败')
          }
        })
    }
  },

  __handleDataTrans(storage_data) {

    const cas = this.data.cas
    const purity = this.data.purity_array[this.data.purity_index]
    const specs = this.data.specs
    wx.navigateTo({
      url: "/pages/home/storage/storage-commit/storage-commit",
      // 通过eventChannel向被打开页面传送数据
      success: res => {
        res.eventChannel.emit('acceptDataFromStorage', {
          storage_data,
          cas,
          purity,
          specs
        })
      }
    })
  }
})