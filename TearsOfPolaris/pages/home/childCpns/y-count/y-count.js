// pages/home/childCpns/y-count/y-count.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 规格 - 普通选择器
    count_array: ['瓶', '箱'],
    count_index: 0,

    countFlag: false,
    count: ""

  },

  /**
   * 组件的方法列表
   */
  methods: {
    countPickerChange(e) {
      console.log('count_picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        count_index: e.detail.value
      })
    },

    count_no_focus(e) {
      // console.log(e.detail)
      const flag = e.detail.flag
      const value = e.detail.value + this.data.count_array[this.data.count_index]
      this.setData({
        countFlag: flag,
        count: value
      })
      const data = { flag, value }
      this.triggerEvent("count_no_focus", data, {})
    },
  }
})
