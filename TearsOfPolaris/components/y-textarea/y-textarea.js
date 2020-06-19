// components/y-textarea/y-textarea.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: ''
    }
  },

  externalClasses: ['c_titleclass'],

  /**
   * 组件的初始数据
   */
  data: {
    strlen: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    focus(e) {
      let value = e.detail.value;
      // console.log(value.length)
      this.setData({
        strlen: value.length
      })
    },

    no_focus(e) {
      let value = e.detail.value;
      let flag = true
      if (!value) {
        flag = false
      }
      // console.log(value, flag)
      let data = { value, flag }
      this.triggerEvent('no_focus', data, {})
    }
  }
})
