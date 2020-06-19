// pages/home/output/orderlist/orderlist.js

const types = ['all', 'uncheck', 'unoutput', 'unconfirm']

Page({

  data: {
    titles: ['全部', '待审核', '待出库', '待确认'],

    datas: {
      'all': [],
      'uncheck': [],
      'unoutput': [],
      'unconfirm': []
    },

    currentType: 'all',
  },

  tabClick(e) {
    // console.log(e.detail.index)
    const index = e.detail.index
    this.setData({
      currentType: types[index]
    })
    // console.log(this.data.currentType)
  },

  onReady() {
    // 监听output页面传来的数据
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptIdFromOutput', data => {
      switch (data.id) {
        case '1':
          this.setData({
            currentType: 'uncheck'
          })
          break
        case '2':
          this.setData({
            currentType: 'unoutput'
          })
          break
        case '3':
          this.setData({
            currentType: 'unconfirm'
          })
          break
      }

      // 把id传给tab-control
      this.selectComponent("#y-tab-control").setCurrentIndex(data.id)

      // 处理数据
      this._handleData(data)
    })
  },

  _handleData(data) {
    // 全部订单
    let all_order = data.input_order.concat(data.apply_order)
    this.setData({
      'datas.all': all_order
    })

    // 待审核, 待出库
    let uncheck_order = []
    let unoutput_order = []
    for (let i of all_order) {
      switch(i.Check_flag) {
        case 0: 
          uncheck_order.push(i)
          break
        case 1:
          unoutput_order.push(i)
          break
      }
    }
    this.setData({
      'datas.uncheck': uncheck_order,
      'datas.unoutput': unoutput_order
    })

    // 待确认 
  }
})