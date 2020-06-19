package models

import (
	"fmt"
	"tpl_api/utils"

	"github.com/astaxie/beego/logs"
)

type Order struct {
	Openid string
}

type OrderInputRowInfo struct {
	Order_id    string
	Addr        string
	Input_Use   string
	Check_id    string
	Check_flag  int
	Cas         string
	Purity      string
	Specs       string
	Input_count int
	Create_time string
}

type OrderApplyRowInfo struct {
	Order_id    string
	Addr        string
	Apply_Use   string
	Check_id    string
	Check_flag  int
	Cas         string
	Purity      string
	Specs       string
	Apply_count int
	Apply_time  string
	Create_time string
}

// -------------------------------数据库操作-------------------------------
// 按条件查询: 1.根据openid查询input表中的order_id, addr, input_use, check_id, check_flag, cas, purity, specs, input_count,create_time
func OrderQueryInput(order Order) []OrderInputRowInfo {
	sql := fmt.Sprintf("select order_id, addr, input_use, check_id, check_flag, cas, purity, specs, input_count,create_time from input where openid=\"%s\" order by create_time DESC",
		order.Openid)
	logs.Info("OrderQueryInput: ", sql)

	rowinfo := OrderInputRowInfo{}
	rowlist := []OrderInputRowInfo{}
	rows, _ := utils.QueryRowDB(sql)

	for rows.Next() {
		rows.Scan(&rowinfo.Order_id, &rowinfo.Addr, &rowinfo.Input_Use, &rowinfo.Check_id, &rowinfo.Check_flag, &rowinfo.Cas, &rowinfo.Purity, &rowinfo.Specs, &rowinfo.Input_count, &rowinfo.Create_time)
		rowlist = append(rowlist, rowinfo)
	}

	return rowlist
}

// 按条件查询: 2.根据openid查询apply表中的order_id, addr, apply_use, check_id, check_flag, cas, purity, specs, apply_count, apply_time, create_time
func OrderQueryApply(order Order) []OrderApplyRowInfo {
	sql := fmt.Sprintf("select order_id, addr, apply_use, check_id, check_flag, cas, purity, specs, apply_count, apply_time, create_time from apply where openid=\"%s\" order by create_time DESC",
		order.Openid)
	logs.Info("OrderQueryApply: ", sql)

	rowinfo := OrderApplyRowInfo{}
	rowlist := []OrderApplyRowInfo{}
	rows, _ := utils.QueryRowDB(sql)

	for rows.Next() {
		rows.Scan(&rowinfo.Order_id, &rowinfo.Addr, &rowinfo.Apply_Use, &rowinfo.Check_id, &rowinfo.Check_flag, &rowinfo.Cas, &rowinfo.Purity, &rowinfo.Specs, &rowinfo.Apply_count, &rowinfo.Apply_time, &rowinfo.Create_time)
		rowlist = append(rowlist, rowinfo)
	}

	return rowlist
}
