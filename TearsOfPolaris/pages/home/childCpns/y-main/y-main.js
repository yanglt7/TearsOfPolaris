// pages/home/childCpns/y-main/y-main.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    naviClick(e) {
      // console.log(e)
      const data = { id: e.detail.id, url: e.detail.url }
      this.triggerEvent('naviClick', data, '')
    }
  }
})
