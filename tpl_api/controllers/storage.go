package controllers

import (
	"tpl_api/models"
	"tpl_api/utils"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
)

type StorageController struct {
	beego.Controller
}

type RespStorage struct {
	ErrCode      int
	ErrMsg       string
	Storage_data []models.StorageInputRowInfo
}

func (this *StorageController) Get() {
	errCode := 0
	errMsg := "storage请求成功"

	// 获取querystorage信息
	var storage models.Storage
	storage.Cas = this.GetString("cas")
	storage.Purity = this.GetString("purity")
	storage.Specs = this.GetString("specs")

	// 获取token
	token := this.GetString("token")
	logs.Info("storage/token: ", token)

	// 解析token, 将storage信息存至数据库
	// 解析token, 获取openid
	storage.Openid = utils.GetOpenid(token, beego.AppConfig.String("SecretKey"))
	logs.Info("storage/openid: ", storage.Openid)
	logs.Info("storage: ", storage)

	// 根据 cas, purity, specs查询storage_count, check_id
	// 1.根据cas, purity, specs查询input表中的input_count, check_id, addr
	storage_data := models.StorageQueryInput(storage)
	logs.Info("storagequeryinput: ", storage_data)
	// 2.根据cas, purity, specs查询apply表中的apply_count, reinput_count, check_id
	apply_data := models.StorageQueryApply(storage)
	logs.Info("queryapply: ", apply_data)

	// 将申领数量apply_count, 回库数量reinput_count合并至storage_data
	resp := &RespStorage{errCode, errMsg, storage_data}
	for inputKey, inputValue := range resp.Storage_data {
		for applyKey, applyValue := range apply_data {
			if applyValue.Check_id == inputValue.Check_id {
				storage_data[inputKey].Apply_count = apply_data[applyKey].Apply_count
				storage_data[inputKey].ReInput_count = apply_data[applyKey].ReInput_count
			}
		}
	}

	// 判断是否存在库存信息
	if len(storage_data) == 0 {
		errCode = 2001
		errMsg = "暂无库存数据"
	}
	logs.Info("storage/errCode&errMsg: ", errCode, errMsg, storage_data)
	resp = &RespStorage{errCode, errMsg, storage_data}
	this.Data["json"] = resp
	this.ServeJSON()
}
