package models

import (
	"fmt"
	"tpl_api/utils"

	"github.com/astaxie/beego/logs"
)

type ReInput struct {
	Openid           string
	Apply_Order_id   string
	ReInput_Order_id string
	ReInput_count    string
	ReInput_time     string
}

// -------------------------------数据库操作-------------------------------

// 根据openid, apply_order_id, 更新apply表中的reinput_id, reinput_count, reinput_time
func UpdateReInput(reInput ReInput) (int64, error) {
	sql := fmt.Sprintf("update apply set reinput_id=\"%s\", reinput_count=\"%s\", reinput_time=\"%s\" where order_id=\"%s\" and openid=\"%s\"",
		reInput.ReInput_Order_id, reInput.ReInput_count, reInput.ReInput_time, reInput.Apply_Order_id, reInput.Openid)
	logs.Info("UpdateReInput: ", sql)
	return utils.ModifyDB(sql)
}
