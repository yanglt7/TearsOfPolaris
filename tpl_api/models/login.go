package models

import (
	"fmt"

	"tpl_api/utils"

	"github.com/astaxie/beego/logs"
)

type User struct {
	Openid     string //用户唯一标识
	Sessionkey string //会话密钥
	Token      string
}

type LoginRowInfo struct {
	Id int
}

// -------------------------------数据库操作-------------------------------
// 插入
func InsertUser(user User) (int64, error) {
	return utils.ModifyDB("insert into users(openid, session_key, token) values(?,?,?)",
		user.Openid, user.Sessionkey, user.Token)
}

// 按条件查询: 根据openid查id, 判断是否曾入库
func QueryUserId(openid string) (id int) {
	sql := fmt.Sprintf("select id from users where openid=\"%s\"", openid)
	logs.Info("QueryUserId: ", sql)

	rowinfo := LoginRowInfo{}
	rowlist := []LoginRowInfo{}
	rows, _ := utils.QueryRowDB(sql)
	for rows.Next() {
		rows.Scan(&rowinfo.Id)
		rowlist = append(rowlist, rowinfo)
	}

	return rowinfo.Id
}

// 根据openid更新token和session_key
func UpdateUser(token string, session_key string, openid string) (int64, error) {
	sql := fmt.Sprintf("update users set token=\"%s\",session_key=\"%s\" where openid=\"%s\"", token, session_key, openid)
	logs.Info("UpdateUser: ", sql)
	return utils.ModifyDB(sql)
}
