package models

import (
	"fmt"
	"tpl_api/utils"

	"github.com/astaxie/beego/logs"
)

type Note struct {
	Openid   string
	Order_id string
	Cas      string
	Note     string
}

// -------------------------------数据库操作-------------------------------

// 根据openid, order_id, cas, 更新note
func UpdateNote(note Note) (int64, error) {
	sql := fmt.Sprintf("update apply set note=\"%s\" where order_id=\"%s\" and openid=\"%s\"", note.Note, note.Order_id, note.Openid)
	logs.Info("UpdateNote: ", sql)
	return utils.ModifyDB(sql)
}
