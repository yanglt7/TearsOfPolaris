package controllers

import (
	"tpl_api/assets"
	"tpl_api/models"
	"tpl_api/utils"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
)

type InputController struct {
	beego.Controller
}

func (this *InputController) Post() {
	errCode := 0
	errMsg := "input请求成功"

	// 获取input信息
	var input models.Input
	input.Order_id = this.GetString("order_id")
	input.Charge_name = this.GetString("charge_name")
	input.Charge_id = this.GetString("charge_id")
	input.Addr = this.GetString("addr")
	input.Use = this.GetString("use")
	input.Check_id = this.GetString("check_id")
	input.Cas = this.GetString("cas")
	input.Purity = this.GetString("purity")
	input.Specs = this.GetString("specs")
	input.Input_count = this.GetString("input_count")
	input.Manufactor = this.GetString("manufactor")
	input.Supplier = this.GetString("supplier")
	input.Supplier_phone = this.GetString("supplier_phone")

	// 获取token
	token := this.GetString("token")
	logs.Info("input/token: ", token)

	// 解析token, 将input信息存至数据库
	// 解析token, 获取openid
	input.Openid = utils.GetOpenid(token, beego.AppConfig.String("SecretKey"))
	logs.Info("input/openid: ", input.Openid)
	logs.Info("input: ", input)

	// 将input信息存至数据库
	insertId, insertErr := models.InsertInput(input)
	if insertErr != nil {
		logs.Error("将input存入数据库中出错: ", insertErr)
		errCode = 4001
		errMsg = "数据格式错误，存储失败"
	} else {
		logs.Info("将input存入数据库中成功, id = ", insertId)
	}

	logs.Info("input/errCode&errMsg: ", errCode, errMsg)
	resp := &assets.RespCommon{ErrCode: errCode, ErrMsg: errMsg}
	this.Data["json"] = resp
	this.ServeJSON()
}
