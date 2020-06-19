// pages/home/childCpns/y-specs/y-specs.js
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
    specs_array: ['ML', 'L', 'g', 'kg'],
    specs_index: 0,

    specsFlag: false,
    spces: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    specsPickerChange(e) {
      console.log('specs_picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        specs_index: e.detail.value
      })
    },

    specs_no_focus(e) {
      // console.log(e.detail)
      const flag = e.detail.flag
      const value = e.detail.value + this.data.specs_array[this.data.specs_index]
      this.setData({
        specsFlag: flag,
        specs: value
      })
      const data = {flag, value}
      this.triggerEvent("specs_no_focus", data, {})
    },
  }
})