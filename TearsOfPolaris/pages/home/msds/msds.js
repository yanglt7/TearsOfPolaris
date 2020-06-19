// pages/home/msds/msds.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    cas: "",
    id: ""
  },

  onLoad() {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('msds', data => {
      console.log(data)
      this.setData({
        name: data.name,
        id: data.id,
        cas: data.cas
      })
    })
  },

  ondownload(e) {
    console.log(e)
    wx.downloadFile({
      url: "http://msds.anquan.com.cn/d/?id=" + this.data.id,
      success: res => {
        var filePath = res.tempFilePath
        // console.log(filePath)
        wx.openDocument({
          filePath,
          fileType: 'pdf',
          success: res => {
            console.log('打开文件成功')
          }
        })
      },
      fail: res => {
        console.log("文件下载失败")
      },
    })
  }
})