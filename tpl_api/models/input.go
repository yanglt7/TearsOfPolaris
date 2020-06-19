package models

import (
	"tpl_api/utils"
)

type Input struct {
	Openid         string
	Order_id       string
	Charge_name    string
	Charge_id      string
	Addr           string
	Use            string
	Check_id       string
	Cas            string
	Purity         string
	Specs          string
	Input_count    string
	Manufactor     string
	Supplier       string
	Supplier_phone string
}

// -------------------------------数据库操作-------------------------------
// 插入openid, order_id, charge_name, charge_id, addr, input_use, check_id,  cas, purity, specs, input_count, manufactor, supplier, supplier_phone
func InsertInput(input Input) (int64, error) {
	return utils.ModifyDB("insert into input(openid, order_id, charge_name, charge_id, addr, input_use, check_id,  cas, purity, specs, input_count, manufactor, supplier, supplier_phone) values(?,?,?,? ,?,?,?,?,?, ?,?,?,?,?)",
		input.Openid, input.Order_id, input.Charge_name, input.Charge_id, input.Addr, input.Use, input.Check_id, input.Cas, input.Purity, input.Specs, input.Input_count, input.Manufactor, input.Supplier, input.Supplier_phone)
}
