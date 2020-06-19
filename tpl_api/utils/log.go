package utils

import (
	"encoding/json"

	"github.com/astaxie/beego/logs"
)

// beego 日志配置结构体
type LoggerConfig struct {
	FileName string `json:"filename"`
	Level    int    `json:"level"`    // 日志保存的时候的级别，默认是 Trace 级别
	Maxlines int    `json:"maxlines"` // 每个文件保存的最大行数，默认值 1000000
	Maxsize  int    `json:"maxsize"`  // 每个文件保存的最大尺寸，默认值是 1 << 28, //256 MB
}

func InitLogger() {
	logConf := LoggerConfig{
		FileName: "logs/app.log",
		Level:    7,
		Maxsize:  102400,
		Maxlines: 1000,
	}
	logConfStr, _ := json.Marshal(&logConf)
	logs.SetLogger(logs.AdapterFile, string(logConfStr))
	logs.EnableFuncCallDepth(true)
}
