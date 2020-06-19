package main

import (
	_ "tpl_api/routers"
	"tpl_api/utils"

	"github.com/astaxie/beego"
)

func main() {
	utils.InitMysql()
	utils.InitLogger()
	beego.Run()
}
