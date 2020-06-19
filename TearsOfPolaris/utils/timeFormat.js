// Sat Apr 04 2020 23: 14: 45 GMT + 0800(中国标准时间) => 2020/04/04 23:17:56
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// Sat Apr 04 2020 23: 14: 45 GMT + 0800(中国标准时间) => 2020-04-04
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

/**
 * 传入时间后几天
 * param：传入时间：dates:"2018-04-02",later:往后多少天
 */
const dateLater = (date, later) => {
  const tempDate = new Date(date)
  tempDate.setDate(tempDate.getDate() + later)
  const year = tempDate.getFullYear()
  const endDate = formatDate(tempDate)
  return endDate
}

// 获取随机订单号
const getOrderId = () => {
  // 获取时间戳
  // 1)Date.parse(new Date())
  // 2)new Date().getTime()
  const timestamp = Date.parse(new Date())
  const timestr = timestamp.toString().substr(5)
  const rand = Math.floor(Math.random() * 10000 + 9999)
  const order_id = timestr + rand
  return order_id
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  dateLater: dateLater,
  getOrderId: getOrderId
}