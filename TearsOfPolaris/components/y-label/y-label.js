// components/y-label/y-label.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    name: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: 'text'
    },
    maxlength: {
      type: String,
      value: "14"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputValue: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    no_focus(e) {
      let id = e.currentTarget.id;
      let value = e.detail.value;
      let flag = true
      if (!value) {
        flag = false
      }
      // console.log(id, value, flag)
      let data = {id, value, flag}
      this.triggerEvent('no_focus', data, {})
    }
  }
})
