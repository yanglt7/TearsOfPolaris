package controllers

import (
	"tpl_api/assets"
	"tpl_api/models"
	"tpl_api/utils"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
)

type ApplyController struct {
	beego.Controller
}

func (this *ApplyController) Post() {
	errCode := 0
	errMsg := "apply请求成功"

	// 获取apply信息
	var apply models.Apply
	apply.Order_id = this.GetString("order_id")
	apply.Apply_name = this.GetString("apply_name")
	apply.Apply_id = this.GetString("apply_id")
	apply.Addr = this.GetString("addr")
	apply.Apply_time = this.GetString("apply_time")
	apply.Use = this.GetString("use")
	apply.Check_id = this.GetString("check_id")
	apply.Cas = this.GetString("cas")
	apply.Purity = this.GetString("purity")
	apply.Specs = this.GetString("specs")
	apply.Apply_count = this.GetString("apply_count")

	// 获取token
	token := this.GetString("token")
	logs.Info("apply/token: ", token)

	// 解析token, 将apply信息存至数据库
	// 解析token, 获取openid
	apply.Openid = utils.GetOpenid(token, beego.AppConfig.String("SecretKey"))
	logs.Info("apply/openid: ", apply.Openid)
	logs.Info("apply: ", apply)

	// 将apply信息存至数据库
	insertId, insertErr := models.InsertApply(apply)
	if insertErr != nil {
		logs.Error("将apply存入数据库中出错: ", insertErr)
		errCode = 4001
		errMsg = "数据格式错误，存储失败"
	} else {
		logs.Info("将apply存入数据库中成功, id = ", insertId)
	}

	logs.Info("apply/errCode&errMsg: ", errCode, errMsg)
	resp := &assets.RespCommon{ErrCode: errCode, ErrMsg: errMsg}
	this.Data["json"] = resp
	this.ServeJSON()
}
