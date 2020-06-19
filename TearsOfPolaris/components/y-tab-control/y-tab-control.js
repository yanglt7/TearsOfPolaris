// pages/home/childCpns/y-tab-control/y-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(e) {
      // 1.设置最新的index
      // console.log(e)
      this.setData({
        currentIndex: e.currentTarget.dataset.index
      })

      // console.log(this.data.currentIndex)
      // 2.发出事件
      const data = {index: this.data.currentIndex}
      this.triggerEvent('tabClick', data, {})
    },

    // 接受output传来的id
    setCurrentIndex(index) {
      // console.log(index)
      this.setData({
        currentIndex: index
      })
    }
  },
})
