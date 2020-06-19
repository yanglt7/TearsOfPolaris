// pages/home/output/output.js
var icon = require("../../../assets/img/output/icon")
import {
  queryOrder
} from '../../../utils/network/home.js'

import {
  showFalseToast,
  showTrueToast
} from '../../../assets/js/common.js'

const app = getApp()
const globalData = app.globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    'orderlist': [{
        'id': 1,
        'title': '待审核',
        'img': icon.check
      },
      {
        'id': 2,
        'title': '待出库',
        'img': icon.transport
      },
      {
        'id': 3,
        'title': '待确认',
        'img': icon.confirm
      }
    ]
  },

  // 页面间数据传递 output -> orderlist
  itemClick(e) {
    // console.log(e.detail.id)
    // 发送网络请求
    queryOrder(globalData.token).then(res => {
      console.log(res.ErrMsg)
      if (res.ErrCode == 0) {
        this._handleData(e.detail.id, res.InputOrder, res.ApplyOrder)
      } else {
        showFalseToast()
      }
    })
  },

  _handleData(id, input_order, apply_order) {
    wx.navigateTo({
      url: "/pages/home/output/orderlist/orderlist",
      success: res => {
        res.eventChannel.emit('acceptIdFromOutput', {
          id,
          input_order,
          apply_order
        })
      }
    })
  }
})