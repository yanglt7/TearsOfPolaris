package models

import (
	"tpl_api/utils"
)

type Apply struct {
	Openid      string
	Order_id    string
	Apply_name  string
	Apply_id    string
	Addr        string
	Apply_time  string
	Use         string
	Check_id    string
	Cas         string
	Purity      string
	Specs       string
	Apply_count string
}

// -------------------------------数据库操作-------------------------------
// 插入openid, order_id, apply_name, apply_id, addr, apply_time, use, check_id, cas, name, purity, specs, apply_count
func InsertApply(apply Apply) (int64, error) {
	return utils.ModifyDB("insert into apply(openid, order_id, apply_name, apply_id, addr, apply_time, apply_use, check_id,  cas, purity, specs, apply_count) values(?,?,?,?,?,?,?,?,?,?,?,?)",
		apply.Openid, apply.Order_id, apply.Apply_name, apply.Apply_id, apply.Addr, apply.Apply_time, apply.Use, apply.Check_id, apply.Cas, apply.Purity, apply.Specs, apply.Apply_count)
}
