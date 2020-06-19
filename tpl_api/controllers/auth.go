package controllers

import (
	"tpl_api/assets"
	"tpl_api/models"
	"tpl_api/utils"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
)

type AuthController struct {
	beego.Controller
}

func (this *AuthController) Post() {
	errCode := 0
	errMsg := "auth请求成功"

	token := this.GetString("token")
	logs.Info("auth/token: ", token)

	// 解析token, 取出openid
	openid := utils.GetOpenid(token, beego.AppConfig.String("SecretKey"))
	logs.Info("auth/openid: ", openid)

	// 到数据库查询openid是否存在
	id := models.QueryUserId(openid)

	switch id {
	case 0: // 若无openid, 返回errcode1002:token无效
		errCode = 1002
		errMsg = "token无效"
		break
	case 1: // 若有openid, 则查询token过期时间
		flag := utils.CheckToken(token, beego.AppConfig.String("SecretKey"))
		switch flag {
		case 0: // 若token过期, 返回errcode1001:token过期
			errCode = 1001
			errMsg = "token过期, 请重新登录"
			// 根据openid更新数据库中的token
			break
		case 1: // 若token未过期, 则返回验证token成功, errcode为0
			break
		}
		break
	}
	logs.Info("auth/errCode&errMsg: ", errCode, errMsg)
	resp := &assets.RespCommon{ErrCode: errCode, ErrMsg: errMsg}
	this.Data["json"] = resp
	this.ServeJSON()
	return
}
