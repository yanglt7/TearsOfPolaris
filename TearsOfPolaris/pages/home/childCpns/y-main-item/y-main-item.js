// pages/home/childCpns/y-main-item/y-main-item.js
// const app = getApp()
// const globalData = app.globalData

import {
  NOTE,
  RECORD,
  BILL,
  STORAGE,
  INPUT,
  APPLY,
  OUTPUT,
  REINPUT,
  RECYCLE
} from '../../../../assets/js/const.js'

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
    currentTitle: '',
    naviTitle: '',
    url: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(e) {
      let tempTitle = ''
      switch (e.currentTarget.id) {
        case NOTE:
          tempTitle = 'note'
          break;
        case RECORD:
          tempTitle = 'record'
          break;
        case BILL:
          tempTitle = 'bill'
          break;
        case STORAGE:
          tempTitle = 'storage'
          break;
        case INPUT:
          tempTitle = 'input'
          break;
        case APPLY:
          tempTitle = 'apply'
          break;
        case OUTPUT:
          tempTitle = 'output'
          break;
        case REINPUT:
          tempTitle = 'reInput'
          break;
        case RECYCLE:
          tempTitle = 'recycle'
          break;
      }
      this.setData({
        currentTitle: e.currentTarget.id,
        naviTitle: tempTitle,
        url: '/pages/home/' + tempTitle + '/' + tempTitle
      })

      const data = {id: tempTitle, url: this.data.url }
      this.triggerEvent('naviClick', data, {})
    }
  }
})
