package controllers

import (
	"tpl_api/models"
	"tpl_api/utils"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
)

type LoginController struct {
	beego.Controller
}

type RespLogin struct {
	ErrCode int
	ErrMsg  string
	Token   string
}

func (this *LoginController) Post() {
	errCode := 0
	errMsg := "login请求成功"

	// 1.获取小程序传过来的code
	code := this.GetString("code")
	logs.Info("code: ", code)

	// 2.根据code登录微信服务器,获得openid 和session_key
	resp, err := loginWxServer(code)
	if err != 0 {
		logs.Error(resp.ErrMsg)
		logs.Error(resp.Errcode)
		respLogin := &RespLogin{ErrCode: resp.Errcode, ErrMsg: resp.ErrMsg, Token: ""}
		this.Data["json"] = respLogin
		this.ServeJSON()
	} else {
		var user models.User
		user.Openid = resp.Openid
		user.Sessionkey = resp.Sessionkey
		logs.Info("openid: ", resp.Openid)
		logs.Info("session_key: ", resp.Sessionkey)

		// 3.根据openid和session_key生成自定义登录态token
		token, _ := utils.CreateToken([]byte(beego.AppConfig.String("SecretKey")), resp.Openid)
		user.Token = token
		logs.Info("token: ", token)

		// 4. 判断是否第一次登录, 查询数据库中是否存在openid
		queryId := models.QueryUserId(resp.Openid)
		logs.Info("queryId: ", queryId)
		if queryId != 0 { // 若存在, 则更新token和session_key
			updateId, updateErr := models.UpdateUser(token, resp.Sessionkey, resp.Openid)
			if updateErr != nil {
				logs.Error("更新token和session_key出错: ", updateErr)
				errCode = 4002
				errMsg = "数据格式错误，更新失败"
			}
			logs.Info("更新token和session_key成功, id = ", updateId)
		} else { // 将openid, session_key, token存入数据库中
			insertId, insertErr := models.InsertUser(user)
			if insertErr != nil {
				logs.Error("将openid, session_key, token存入数据库中出错: ", insertErr)
				errCode = 4001
				errMsg = "数据格式错误，存储失败"
			} else {
				logs.Info("将openid, session_key, token存入数据库中成功, id = ", insertId)
			}
		}

		// 5.返回token给小程序
		respLogin := &RespLogin{ErrCode: errCode, ErrMsg: errMsg, Token: token}
		this.Data["json"] = respLogin
		this.ServeJSON()
	}
}
