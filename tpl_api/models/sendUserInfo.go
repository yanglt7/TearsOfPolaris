package models

import (
	"fmt"

	"tpl_api/utils"

	"github.com/astaxie/beego/logs"
)

type UserInfo struct {
	Username string
	Identity string
	UserId   string
	Email    string
	Openid   string
}

// -------------------------------数据库操作-------------------------------

// 根据openid更新token和session_key
func UpdateUser2(userinfo UserInfo) (int64, error) {
	sql := fmt.Sprintf("update users set user_name=\"%s\",identity=\"%s\",user_id=\"%s\",email=\"%s\" where openid=\"%s\"",
		userinfo.Username, userinfo.Identity, userinfo.UserId, userinfo.Email, userinfo.Openid)
	logs.Info("UpdateUser2: ", sql)
	return utils.ModifyDB(sql)
}
