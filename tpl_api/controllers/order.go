package controllers

import (
	"tpl_api/models"
	"tpl_api/utils"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
)

type OrderController struct {
	beego.Controller
}

type RespOrder struct {
	ErrCode    int
	ErrMsg     string
	InputOrder []models.OrderInputRowInfo
	ApplyOrder []models.OrderApplyRowInfo
}

func (this *OrderController) Get() {
	errCode := 0
	errMsg := "order请求成功"

	// 获取queryorder信息
	var order models.Order
	// 获取token
	token := this.GetString("token")
	logs.Info("order/token: ", token)

	// 解析token, 获取openid
	order.Openid = utils.GetOpenid(token, beego.AppConfig.String("SecretKey"))
	logs.Info("order/openid: ", order.Openid)

	// 获取orderqueryinput信息
	input_order := models.OrderQueryInput(order)
	logs.Info("orderqueryinput: ", input_order)
	// 获取orderqueryapply信息
	apply_order := models.OrderQueryApply(order)
	logs.Info("orderqueryapply: ", apply_order)

	logs.Info("order/errCode&errMsg: ", errCode, errMsg, input_order, apply_order)
	resp := &RespOrder{errCode, errMsg, input_order, apply_order}
	this.Data["json"] = resp
	this.ServeJSON()
}
