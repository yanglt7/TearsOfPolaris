package controllers

import (
	"tpl_api/assets"
	"tpl_api/models"
	"tpl_api/utils"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
)

type ReInputController struct {
	beego.Controller
}

func (this *ReInputController) Post() {
	errCode := 0
	errMsg := "reInput请求成功"

	// 获取reInput信息
	var reInput models.ReInput
	reInput.Apply_Order_id = this.GetString("apply_order_id")
	reInput.ReInput_Order_id = this.GetString("reInput_order_id")
	reInput.ReInput_count = this.GetString("reInput_count")
	reInput.ReInput_time = this.GetString("return_time")
	// 获取token
	token := this.GetString("token")
	logs.Info("reInput/token: ", token)

	// 解析token, 获取openid
	reInput.Openid = utils.GetOpenid(token, beego.AppConfig.String("SecretKey"))
	logs.Info("reInput/openid: ", reInput.Openid)

	// 根据openid, apply_order_id, 更新apply表中的reinput_id, reinput_count, return_time
	updateId, updateErr := models.UpdateReInput(reInput)
	if updateErr != nil {
		logs.Error("更新reInput出错: ", updateErr)
		errCode = 4002
		errMsg = "数据格式错误，更新失败"
	} else {
		logs.Info("更新reInput成功, id = ", updateId)
	}

	logs.Info("reInput/errCode&errMsg: ", errCode, errMsg)
	resp := &assets.RespCommon{ErrCode: errCode, ErrMsg: errMsg}
	this.Data["json"] = resp
	this.ServeJSON()
}
