// pages/profile/childCpns/y-list/y-list-item/y-list-item.js
var icon = require("../../../../../assets/img/list/icon")

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item_id: {
      type: String,
      value: ''
    },
    item_img: {
      type: String,
      value: ''
    },
    item_title: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ft_arrow: icon.ft_arrow
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e) {
      // console.log(e)
      const id = e.currentTarget.id
      const data = {id}
      this.triggerEvent('onClick', data, {})
    }
  },

  externalClasses: ['line-class']
})
