// components/y-picker/y-picker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    label: {
      type: String,
      value: ''
    },
    array: {
      type: Array,
      value: []
    },
    index: {
      type: Number,
      value: 0
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
    bindPickerChange(e) {
      // console.log('picker发送选择改变，携带值为', e.detail.value)
      const data = { value: e.detail.value}
      this.triggerEvent('pickerChange', data, {})
    },
  }
})
