// pages/home/note/note.js
import {
  sendNote
} from '../../../utils/network/home.js'

import {
  showFalseToast
} from '../../../assets/js/common.js'

const app = getApp()
const globalData = app.globalData

Page({

  data: {
    // 表单验证
    casFlag: false,
    order_idFlag: false,
    flag: false,

    // 网络请求参数
    order_id: '',
    cas: '',
    note: ''
  },

  note_no_focus(e) {
    // console.log(e.detail.value)
    this.setData({
      note: e.detail.value
    })
  },

  cas_no_focus(e) {
    // console.log(e.detail)
    this.setData({
      casFlag: e.detail.flag,
      cas: e.detail.value
    })
  },
  order_id_no_focus(e) {
    // console.log(e.detail)
    this.setData({
      order_idFlag: e.detail.flag,
      order_id: e.detail.value
    })
  },

  formsubmit() {
    // console.log('formsumbit')
    let flag = this.data.casFlag && this.data.order_idFlag
    console.log(flag)
    if (flag) {
      this.setData({
        flag
      })
    }
  },

  btnClick() {
    if (!this.data.flag) {
      showFalseToast()
    } else {
      // 将数据发送到后台
      sendNote(globalData.token, this.data.order_id, this.data.cas, this.data.note)
        .then(res => {
          console.log(res.ErrMsg)
          if (res.ErrCode == 0) {
            wx.navigateTo({
              url: '/pages/home/note/note-commit/note-commit'
            })
          } else {
            showFalseToast()
          }
        })
    }
  },
})