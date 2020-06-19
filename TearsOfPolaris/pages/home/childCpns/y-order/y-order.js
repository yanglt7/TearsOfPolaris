// pages/home/output/childCpns/y-order/y-order.js
var icon = require("../../../../assets/img/common/icon.js")

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    details: icon.details,
    next: icon.next,
    Check_flag: ['待审核', '待出库', '待确认']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTitle(e) {
      console.log(e)
    }
  },

})
