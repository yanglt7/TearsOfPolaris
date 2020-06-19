package controllers

import (
	"tpl_api/assets"
	"tpl_api/models"
	"tpl_api/utils"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
)

type SendUserInfoController struct {
	beego.Controller
}

func (this *SendUserInfoController) Post() {
	errCode := 0
	errMsg := "sendUserInfo请求成功"

	// 获取user_name, identity, user_id, email等用户信息
	var userinfo models.UserInfo
	userinfo.Username = this.GetString("user_name")
	userinfo.Identity = this.GetString("identity")
	userinfo.UserId = this.GetString("user_id")
	userinfo.Email = this.GetString("email")

	// 获取token
	token := this.GetString("token")
	logs.Info("sendUserInfo/token: ", token)

	// 解析token, 根据openid将用户信息更新至数据库
	// 解析token, 获取openid
	userinfo.Openid = utils.GetOpenid(token, beego.AppConfig.String("SecretKey"))
	logs.Info("sendUserInfo/openid: ", userinfo.Openid)
	// 根据openid将用户信息更新至数据库
	updateId, updateErr := models.UpdateUser2(userinfo)
	if updateErr != nil {
		logs.Error("更新user_name, identity, user_id, email出错: ", updateErr)
		errCode = 4002
		errMsg = "数据格式错误，更新失败"
	} else {
		logs.Info("更新user_name, identity, user_id, email成功, id = ", updateId)
	}

	logs.Info("sendUserInfo: ", userinfo)
	resp := &assets.RespCommon{ErrCode: errCode, ErrMsg: errMsg}
	this.Data["json"] = resp
	this.ServeJSON()
}
