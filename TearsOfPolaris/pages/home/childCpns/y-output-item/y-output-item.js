// pages/home/output/childCpns/y-output-item/y-output-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
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
    itemClick(e) {
      // console.log(e)

      const data = {id: e.currentTarget.id}
      this.triggerEvent('itemClick', data, {})
    }
  }
})
