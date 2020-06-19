// pages/home/storage/storage-commit/storage-commit.js
var icon = require("../../../../assets/img/common/icon.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    storage_data: [],
    cas: '',
    purity: '',
    specs: '',
    apply_all_count: 0,
    reInput_all_count: 0,
    input_all_count: 0,
    storage_all_count: 0,
    apply_count: 0,
    reInput_count: 0,
    input_count: 0,
    storage_count: 0,
    addr: '',
    check_id: '',

    // next
    prev: icon.prev,
    next: icon.next,
    currentPage: 1,
    pages: 1
  },

  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
  },

  onReady() {
    const eventChannel = this.getOpenerEventChannel()

    // 监听storage页面传来的数据
    eventChannel.on('acceptDataFromStorage', data => {
      console.log(data)
      if (data.storage_data.length != 0) {
        this._handleData(data)
      } else {
        wx.showModal({
          title: '错误提示',
          content: '抱歉，暂无相关库存数据',
          showCancel: false,
          confirmText: '我知道了',
        })
      }
    })

    wx.hideLoading()
  },

  _handleData(data) {
    let apply_all_count = 0
    let reInput_all_count = 0
    let input_all_count = 0
    for (let i of data.storage_data) {
      // 获取总申领数量
      apply_all_count += i.Apply_count
      // 获取总回库数量
      reInput_all_count += i.ReInput_count
      // 获取总入库数量
      input_all_count += i.Input_count
    }
    // 获取总库存数量
    let storage_all_count = input_all_count + reInput_all_count - apply_all_count

    this.setData({
      storage_data: data.storage_data,
      cas: data.cas,
      purity: data.purity,
      specs: data.specs,

      // 不变数据
      pages: data.storage_data.length,
      apply_all_count,
      reInput_all_count,
      input_all_count,
      storage_all_count,

      // 翻页改变的数据
      input_count: data.storage_data[0].Input_count,
      reInput_count: data.storage_data[0].ReInput_count,
      apply_count: data.storage_data[0].Apply_count,
      addr: data.storage_data[0].Addr,
      check_id: data.storage_data[0].Check_id,
      storage_count: data.storage_data[0].Input_count + data.storage_data[0].ReInput_count - data.storage_data[0].Apply_count
    })
  },

  prevPage() {
    console.log('prevPage')
    if (this.data.currentPage > 1) {
      this.setData({
        currentPage: this.data.currentPage - 1
      })
    }
    this.setData({
      prev: icon.prev_active,
      input_count: this.data.storage_data[this.data.currentPage - 1].Input_count,
      reInput_count: this.data.storage_data[this.data.currentPage - 1].ReInput_count,
      apply_count: this.data.storage_data[this.data.currentPage - 1].Apply_count,
      addr: this.data.storage_data[this.data.currentPage - 1].Addr,
      check_id: this.data.storage_data[this.data.currentPage - 1].Check_id,
      storage_count: this.data.storage_data[this.data.currentPage - 1].Input_count + this.data.storage_data[this.data.currentPage - 1].ReInput_count - this.data.storage_data[this.data.currentPage - 1].Apply_count
    })
  },

  nextPage() {
    console.log('nextPage')
    if (this.data.currentPage < this.data.pages) {
      this.setData({
        currentPage: this.data.currentPage + 1
      })
    }
    this.setData({
      next: icon.next_active,
      input_count: this.data.storage_data[this.data.currentPage - 1].Input_count,
      reInput_count: this.data.storage_data[this.data.currentPage - 1].ReInput_count,
      apply_count: this.data.storage_data[this.data.currentPage - 1].Apply_count,
      addr: this.data.storage_data[this.data.currentPage - 1].Addr,
      check_id: this.data.storage_data[this.data.currentPage - 1].Check_id,
      storage_count: this.data.storage_data[this.data.currentPage - 1].Input_count + this.data.storage_data[this.data.currentPage - 1].ReInput_count - this.data.storage_data[this.data.currentPage - 1].Apply_count
    })
  }
})