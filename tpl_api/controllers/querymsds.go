package controllers

import (
	"io/ioutil"
	"net/http"
	"net/url"
	"regexp"
	"strings"
	"tpl_api/utils"

	"github.com/astaxie/beego/logs"
)

func queryMsds(cas string) (id string, name string) {

	// 1.向http://msds.anquan.com.cn/v/发送post请求,获取id
	postUrl := "http://msds.anquan.com.cn/v/"
	resp, httpErr := http.PostForm(postUrl, url.Values{"keyword": {cas}})
	if httpErr != nil {
		return
	}
	defer resp.Body.Close()

	body, ioErr := ioutil.ReadAll(resp.Body)
	if ioErr != nil {
		return
	}
	strbody := utils.ConvertToString(string(body), "gbk", "utf-8")

	// 2.从response中通过正则匹配获取id, 试剂名称
	// <a href=?id=ulh77g>
	r1, _ := regexp.Compile("<a .*?id=.*?>")
	regid := r1.FindString(strbody)
	rawid := strings.Split(regid, "=")
	ids := strings.Split(rawid[2], ">")
	id = ids[0]
	logs.Info("msds/id:", id)
	// <span class="f1">氨
	r2, _ := regexp.Compile("<span class=\"f1\">.*?</span>")
	regname := r2.FindString(strbody)
	rawname := strings.Split(regname, ">")
	names := strings.Split(rawname[1], "<")
	name = names[0]
	logs.Info("msds/name:", name)

	return id, name
}
