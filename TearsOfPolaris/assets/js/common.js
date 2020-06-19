export function showFalseToast(title="提交失败") {
  wx.showToast({
    title,
    image: "/assets/img/toast/error.png",
    mask: true,
    success: () => {
      setTimeout(() => {
        wx.hideToast()
      }, 1500)
    }
  })
}

export function showTrueToast(title="提交成功", url="/pages/home/home") {
  wx.showToast({
    title,
    icon: 'success',
    mask: true,
    success: () => {
      setTimeout(() => {
        wx.reLaunch({
          url
        })
      }, 1500)
    }
  })
}