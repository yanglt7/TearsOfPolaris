import request from './network.js'

export function sendApply(token, order_id, apply_name, apply_id, addr, apply_time, use, check_id, cas, purity, specs, apply_count) {
  return request({
    url: '/apply',
    data: {
      token,
      order_id,
      apply_name,
      apply_id,
      addr,
      apply_time,
      use,
      check_id,
      cas,
      purity,
      specs,
      apply_count
    },
    header: {
      "Content-Type": 'application/x-www-form-urlencoded'
    },
    method: 'post'
  })
}

export function sendInput(token, order_id, charge_name, charge_id, addr, use, check_id, cas, purity, specs, input_count, manufactor, supplier, supplier_phone) {
  return request({
    url: '/input',
    data: {
      token,
      order_id,
      charge_name,
      charge_id,
      addr,
      use,
      check_id,
      cas,
      purity,
      specs,
      input_count,
      manufactor,
      supplier,
      supplier_phone
    },
    header: {
      "Content-Type": 'application/x-www-form-urlencoded'
    },
    method: 'post'
  })
}

export function sendNote(token, order_id, cas, note) {
  return request({
    url: '/note',
    data: {
      token,
      order_id,
      cas,
      note
    },
    header: {
      "Content-Type": 'application/x-www-form-urlencoded'
    },
    method: 'post'
  })
}

export function sendReInput(token, apply_order_id, reInput_order_id, reInput_count, return_time) {
  return request({
    url: '/reinput',
    data: {
      token,
      apply_order_id, 
      reInput_order_id, 
      reInput_count,
      return_time
    },
    header: {
      "Content-Type": 'application/x-www-form-urlencoded'
    },
    method: 'post'
  })
}

export function queryStorage(token, cas, purity, specs) {
  return request({
    url: '/storage',
    data: {
      token,
      cas,
      purity,
      specs
    },
    header: {
      "Content-Type": 'application/x-www-form-urlencoded'
    },
    method: 'get'
  })
}

export function queryOrder(token) {
  return request({
    url: '/order',
    data: {
      token
    },
    header: {
      "Content-Type": 'application/x-www-form-urlencoded'
    },
    method: 'get'
  })
}

export function queryMsds(token, cas) {
  return request({
    url: '/msds',
    data: {
      token,
      cas
    },
    header: {
      "Content-Type": 'application/x-www-form-urlencoded'
    },
    method: 'get'
  })
}