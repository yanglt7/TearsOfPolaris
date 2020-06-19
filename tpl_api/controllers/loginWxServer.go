package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
)

type RespWxServer struct {
	Openid     string `json:"openid"`      //用户唯一标识
	Sessionkey string `json:"session_key"` //会话密钥
	Unionid    string `json:"unionid"`     //用户在开放平台的唯一标识符，在满足 UnionID 下发条件的情况下会返回，详见 UnionID 机制说明。
	Errcode    int    `json:"errcode"`     //错误码
	ErrMsg     string `json:"errMsg"`      //错误信息
}

func loginWxServer(code string) (config RespWxServer, errcode int) {
	//https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
	appId := beego.AppConfig.String("appId")
	appSecret := beego.AppConfig.String("appSecret")
	url := "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code"
	requestUrl := fmt.Sprintf(url, appId, appSecret, code)
	resp, httpErr := http.Get(requestUrl)
	if httpErr != nil {
		return
	}
	defer resp.Body.Close()

	body, ioErr := ioutil.ReadAll(resp.Body)
	if ioErr != nil {
		return
	}

	// jsonString转jsonStruct
	jsonErr := json.Unmarshal([]byte(string(body)), &config)
	if jsonErr != nil {
		logs.Error(jsonErr)
	}

	return config, config.Errcode
}
