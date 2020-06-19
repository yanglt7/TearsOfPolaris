// pages/home/home.js
var icon = require("../../assets/img/main/icon")

const types = ['storage', 'baseData']

Page({
  data: {
    titles: ['库存管理', '基础数据'],
    datas: {
      'storage': {
        list: [{
          'title': '库存',
          'img': icon.storage
        }, {
          'title': '申领',
          'img': icon.apply
        }, {
          'title': '入库',
          'img': icon.input
        }, {
          'title': '出库',
          'img': icon.output
        }, {
          'title': '回库',
          'img': icon.reInput
        }, {
          'title': '回收',
          'img': icon.recycle
        }]
      },
      'baseData': {
        list: [{
          'title': '使用记录',
          'img': icon.note
        }, {
          'title': '轨迹管理',
          'img': icon.record
        }, {
          'title': '台账数据',
          'img': icon.bill
        }]
      }
    },
    currentType: 'storage'
  },
  tabClick(e) {
    // console.log(e.detail.index)
    const index = e.detail.index
    this.setData({
      currentType: types[index]
    })
    // console.log(this.data.currentType)
  },

  naviClick(e) {
    console.log(e.detail.id)
    console.log(e.detail.url)
    const id = e.detail.id
    const url = e.detail.url

    wx.navigateTo({
      url
    })

  },

  onLoad() {
    wx.showNavigationBarLoading()
  },

  onReady() {
    wx.hideNavigationBarLoading()
  },
})