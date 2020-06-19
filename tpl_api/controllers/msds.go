package controllers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
)

type MSDSController struct {
	beego.Controller
}

type RespMsds struct {
	ErrCode int
	ErrMsg  string
	Id      string
	Name    string
}

func (this *MSDSController) Get() {
	errCode := 0
	errMsg := "msds请求成功"

	cas := this.GetString("cas")

	id, name := queryMsds(cas)

	logs.Info("apply/errCode&errMsg: ", errCode, errMsg, id, name)
	resp := &RespMsds{ErrCode: errCode, ErrMsg: errMsg, Id: id, Name: name}
	this.Data["json"] = resp
	this.ServeJSON()
}
