// components/y-agree/y-agree.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    agree_content: {
      type: String,
      value: ''
    },
    TYPE: {
      type: String,
      value: 'success_no_circle'
    },
    SIZE: {
      type: Number,
      value: 10
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isAgree: true
  },

  externalClasses: ['agree_text'],

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
