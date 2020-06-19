// pages/home/input/input.js
import {
  sendInput
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
    tapIndex: 0,

    // 纯度 - 普通选择器
    purity_array: ['化学纯', '分析纯', '优级纯', '基准', '光谱纯', '其他'],
    purity_index: 0,

    // 用途 - 普通选择器
    use_array: ['教学', '科研', '社会服务', '其他'],
    use_index: 0,

    // 表单验证
    nameFlag: false,
    idFlag: false,
    check_idFlag: false,
    casFlag: false,
    specsFlag: false,
    countFlag: false,
    manufactorFlag: false,
    splFlag: false,
    splPhoneFlag: false,
    flag: false,

    // 网络请求参数
    order_id: '',
    charge_name: '',
    charge_id: '',
    addr: '丰盛堂A座1楼101',
    check_id: '',
    cas: '',
    specs: '',
    input_count: '',
    manufactor: '',
    supplier: '',
    supplier_phone: ''
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

  // -----------------表单提交相关事件---------------

  name_no_focus(e) {
    // console.log(e.detail)
    this.setData({
      nameFlag: e.detail.flag,
      charge_name: e.detail.value
    })
  },
  id_no_focus(e) {
    // console.log(e.detail)
    this.setData({
      idFlag: e.detail.flag,
      charge_id: e.detail.value
    })
  },
  check_id_no_focus(e) {
    // console.log(e.detail)
    this.setData({
      check_idFlag: e.detail.flag,
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
      input_count: e.detail.value
    })
  },
  manufactor_no_focus(e) {
    // console.log(e.detail)
    this.setData({
      manufactorFlag: e.detail.flag,
      manufactor: e.detail.value
    })
  },
  supplier_no_focus(e) {
    // console.log(e.detail)
    this.setData({
      splFlag: e.detail.flag,
      supplier: e.detail.value
    })
  },
  splPhone_no_focus(e) {
    // console.log(e.detail)
    this.setData({
      splPhoneFlag: e.detail.flag,
      supplier_phone: e.detail.value
    })
  },
  formsubmit() {
    // console.log('formsumbit')
    let flag = this.data.nameFlag && this.data.idFlag && this.data.check_idFlag && this.data.casFlag && this.data.specsFlag && this.data.countFlag && this.data.manufactorFlag && this.data.splFlag && this.data.splPhoneFlag
    // console.log(flag)
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
      // 将数据发送到后台  specs, , manufactor, supplier, supplier_phone
      sendInput(globalData.token, this.data.order_id, this.data.charge_name, this.data.charge_id, this.data.addr, this.data.use_array[this.data.use_index], this.data.check_id, this.data.cas, this.data.purity_array[this.data.purity_index], this.data.specs,
        this.data.input_count, this.data.manufactor, this.data.supplier, this.data.supplier_phone)
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

  onReady() {
    wx.showActionSheet({
      itemList: ['请选择入库方式', '手动添加', '导入'],
      itemColor: '#69f',
      success: res => {
        if (res.tapIndex == 0) {
          this.navigate("/pages/home/input/input")
        } else if (res.tapIndex == 2) {
          wx.showModal({
            title: '提示',
            content: '抱歉，暂不支持导入',
            showCancel: false,
            success: res => {
              if (res.confirm) {
                this.navigate("/pages/home/input/input")
              }
            }
          })
        }

        this.setData({
          tapIndex: res.tapIndex
        })
      },
      fail: err => {
        this.navigate("/pages/home/home")
      }
    })
  },

  navigate(url) {
    wx.reLaunch({
      url
    })
  }
})