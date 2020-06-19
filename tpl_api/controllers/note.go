package controllers

import (
	"tpl_api/assets"
	"tpl_api/models"
	"tpl_api/utils"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
)

type NoteController struct {
	beego.Controller
}

func (this *NoteController) Post() {
	errCode := 0
	errMsg := "note请求成功"

	// 获取note信息
	var note models.Note
	note.Order_id = this.GetString("order_id")
	note.Cas = this.GetString("cas")
	note.Note = this.GetString("note")

	// 获取token
	token := this.GetString("token")
	logs.Info("note/token: ", token)

	// 解析token, 将note信息存至数据库
	// 解析token, 获取openid
	note.Openid = utils.GetOpenid(token, beego.AppConfig.String("SecretKey"))
	logs.Info("note/openid: ", note.Openid)
	logs.Info("note: ", note)

	// 将note信息存至数据库
	updateId, updateErr := models.UpdateNote(note)
	if updateErr != nil {
		logs.Error("更新note出错: ", updateErr)
		errCode = 4002
		errMsg = "数据格式错误，更新失败"
	} else {
		logs.Info("更新note成功, id = ", updateId)
	}

	logs.Info("note/errCode&errMsg: ", errCode, errMsg)
	resp := &assets.RespCommon{ErrCode: errCode, ErrMsg: errMsg}
	this.Data["json"] = resp
	this.ServeJSON()
}
