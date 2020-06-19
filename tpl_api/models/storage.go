package models

import (
	"fmt"
	"tpl_api/utils"

	"github.com/astaxie/beego/logs"
)

type Storage struct {
	Openid string
	Cas    string
	Purity string
	Specs  string
}

type StorageInputRowInfo struct {
	Input_count   int
	Check_id      string
	Addr          string
	Apply_count   int
	ReInput_count int
}

type StorageApplyRowInfo struct {
	Check_id      string
	Apply_count   int
	ReInput_count int
}

// -------------------------------数据库操作-------------------------------
// 按条件查询: 1.根据cas, purity, specs查询input表中的input_count, storage_input, check_id, addr
func StorageQueryInput(storage Storage) []StorageInputRowInfo {
	sql := fmt.Sprintf("select sum(input_count),check_id,addr from input where cas=\"%s\" and purity=\"%s\" and specs=\"%s\" group by check_id",
		storage.Cas, storage.Purity, storage.Specs)
	logs.Info("StorageQueryInput: ", sql)

	rowinfo := StorageInputRowInfo{}
	rowlist := []StorageInputRowInfo{}
	rows, _ := utils.QueryRowDB(sql)

	for rows.Next() {
		rows.Scan(&rowinfo.Input_count, &rowinfo.Check_id, &rowinfo.Addr)
		rowlist = append(rowlist, rowinfo)
	}
	return rowlist
}

// 按条件查询: 2.根据cas, purity, specs查询apply表中的apply_count, reinput_count, check_id
func StorageQueryApply(storage Storage) []StorageApplyRowInfo {
	sql := fmt.Sprintf("select sum(apply_count),sum(reinput_count),check_id from apply where cas=\"%s\" and purity=\"%s\" and specs=\"%s\" group by check_id",
		storage.Cas, storage.Purity, storage.Specs)
	logs.Info("StorageQueryApply: ", sql)

	rowinfo := StorageApplyRowInfo{}
	rowlist := []StorageApplyRowInfo{}
	rows, _ := utils.QueryRowDB(sql)

	for rows.Next() {
		rows.Scan(&rowinfo.Apply_count, &rowinfo.ReInput_count, &rowinfo.Check_id)
		rowlist = append(rowlist, rowinfo)
	}

	return rowlist
}
