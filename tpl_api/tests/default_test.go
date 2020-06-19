package tests

import (
	"fmt"
	"net/http"
	"strconv"
	"testing"

	"github.com/gavv/httpexpect"
	. "gopkg.in/check.v1"
)

var url string = "http://localhost:8080"
var count int = 1

type MySuite struct{} // 创建测试套件结构体

var _ = Suite(&MySuite{})

func Test(t *testing.T) { TestingT(t) } // 继承testing的方法，可以直接使用go test命令运行

// 前置操作: 在测试套件启动前执行一次
func (s *MySuite) SetUpSuite(c *C) {
	desc1 := "第1个套件开始执行"
	fmt.Println(desc1)
}

// 在测试套件用例都执行完成后执行一次
func (s *MySuite) TearDownSuite(c *C) {
	desc4 := "第1个套件执行完成"
	fmt.Println(desc4)
}

// 在每个用例执行前执行一次
func (s *MySuite) SetUpTest(c *C) {
	desc2 := "第" + strconv.Itoa(count) + "条用例" + c.TestName() + "开始执行"
	fmt.Println(desc2)
}

// 在每个用例执行后执行一次
func (s *MySuite) TearDownTest(c *C) {
	desc3 := "第" + strconv.Itoa(count) + "条用例" + c.TestName() + "执行完成"
	fmt.Println(desc3)
	fmt.Printf("\n")
	count = count + 1
}

func (s *MySuite) TestLogin(c *C) {
	e := httpexpect.New(c, url)         //创建一个httpexpect实例
	postdata := map[string]interface{}{ // 创建一个json变量
		"code": "0236CMfa2HDk8K02fBfa23d3ga26CMfr",
	}
	contentType := "application/json;charset=utf-8"
	e.POST("/login"). // post请求
				WithHeader("ContentType", contentType). // 定义头信息
				WithForm(postdata).                     //传入表单信息
				Expect().
				Status(http.StatusOK). // 判断请求是否200
				JSON().
				Object().                                     // json body实例化
				Keys().Contains("ErrCode", "ErrMsg", "Token") // 检验是否包含ErrCode, ErrMsg, Token
}

func (s *MySuite) TestAuth(c *C) {
	e := httpexpect.New(c, url)         //创建一个httpexpect实例
	postdata := map[string]interface{}{ // 创建一个json变量
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODc3Mjg5OTIsIm9wZW5pZCI6Im9QRktxNWU4MjMzZ1hqUmpkTDRPZFBDZlI5OXMifQ.56hSML25njbMJPuBgPZkqD7652oTeHjZ_sgVTbzqbIo",
	}
	contentType := "application/json;charset=utf-8"
	e.POST("/auth"). // post请求
				WithHeader("ContentType", contentType). // 定义头信息
				WithForm(postdata).                     //传入表单信息
				Expect().
				Status(http.StatusOK). // 判断请求是否200
				JSON().
				Object().                            // json body实例化
				Keys().Contains("ErrCode", "ErrMsg") // 检验是否包含ErrCode, ErrMsg

}

func (s *MySuite) TestSenduserinfo(c *C) {
	e := httpexpect.New(c, url)         //创建一个httpexpect实例
	postdata := map[string]interface{}{ // 创建一个json变量
		"token":     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODc3Mjg5OTIsIm9wZW5pZCI6Im9QRktxNWU4MjMzZ1hqUmpkTDRPZFBDZlI5OXMifQ.56hSML25njbMJPuBgPZkqD7652oTeHjZ_sgVTbzqbIo",
		"user_name": "Y_momo",
		"identity":  "学生",
		"user_id":   "16327114",
		"email":     "yanglt7@163.com",
	}
	contentType := "application/json;charset=utf-8"
	e.POST("/senduserinfo"). // post请求
					WithHeader("ContentType", contentType). // 定义头信息
					WithForm(postdata).                     //传入表单信息
					Expect().
					Status(http.StatusOK). // 判断请求是否200
					JSON().
					Object().                            // json body实例化
					Keys().Contains("ErrCode", "ErrMsg") // 检验是否包含ErrCode, ErrMsg

}

func (s *MySuite) TestApply(c *C) {
	e := httpexpect.New(c, url)         //创建一个httpexpect实例
	postdata := map[string]interface{}{ // 创建一个json变量
		"token":       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODc3Mjg5OTIsIm9wZW5pZCI6Im9QRktxNWU4MjMzZ1hqUmpkTDRPZFBDZlI5OXMifQ.56hSML25njbMJPuBgPZkqD7652oTeHjZ_sgVTbzqbIo",
		"order_id":    "6040500014526",
		"apply_name":  "yanglt",
		"apply_id":    "16327114",
		"addr":        "丰盛堂C座3楼301",
		"apply_time":  "2020-04-21",
		"use":         "教学",
		"check_id":    "211609",
		"cas":         "8008-60-4",
		"purity":      "分析纯",
		"specs":       "100ML",
		"apply_count": "100",
	}
	contentType := "application/json;charset=utf-8"
	e.POST("/apply"). // post请求
				WithHeader("ContentType", contentType). // 定义头信息
				WithForm(postdata).                     //传入表单信息
				Expect().
				Status(http.StatusOK). // 判断请求是否200
				JSON().
				Object().                            // json body实例化
				Keys().Contains("ErrCode", "ErrMsg") // 检验是否包含ErrCode, ErrMsg

}

func (s *MySuite) TestInput(c *C) {
	e := httpexpect.New(c, url)         //创建一个httpexpect实例
	postdata := map[string]interface{}{ // 创建一个json变量
		"token":          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODc3Mjg5OTIsIm9wZW5pZCI6Im9QRktxNWU4MjMzZ1hqUmpkTDRPZFBDZlI5OXMifQ.56hSML25njbMJPuBgPZkqD7652oTeHjZ_sgVTbzqbIo",
		"order_id":       "431870009056",
		"charge_name":    "yanglt",
		"charge_id":      "16327114",
		"addr":           "丰盛堂C座3楼301",
		"use":            "教学",
		"check_id":       "211609",
		"cas":            "8008-60-4",
		"purity":         "分析纯",
		"specs":          "100ML",
		"input_count":    "100",
		"manufactor":     "hope",
		"supplier":       "hope",
		"supplier_phone": "84115662",
	}
	contentType := "application/json;charset=utf-8"
	e.POST("/input"). // post请求
				WithHeader("ContentType", contentType). // 定义头信息
				WithForm(postdata).                     //传入表单信息
				Expect().
				Status(http.StatusOK). // 判断请求是否200
				JSON().
				Object().                            // json body实例化
				Keys().Contains("ErrCode", "ErrMsg") // 检验是否包含ErrCode, ErrMsg

}

func (s *MySuite) TestNote(c *C) {
	e := httpexpect.New(c, url)         //创建一个httpexpect实例
	postdata := map[string]interface{}{ // 创建一个json变量
		"token":    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODc3Mjg5OTIsIm9wZW5pZCI6Im9QRktxNWU4MjMzZ1hqUmpkTDRPZFBDZlI5OXMifQ.56hSML25njbMJPuBgPZkqD7652oTeHjZ_sgVTbzqbIo",
		"order_id": "6040500014526",
		"cas":      "8008-60-4",
		"note":     "note",
	}
	contentType := "application/json;charset=utf-8"
	e.POST("/note"). // post请求
				WithHeader("ContentType", contentType). // 定义头信息
				WithForm(postdata).                     //传入表单信息
				Expect().
				Status(http.StatusOK). // 判断请求是否200
				JSON().
				Object().                            // json body实例化
				Keys().Contains("ErrCode", "ErrMsg") // 检验是否包含ErrCode, ErrMsg

}

func (s *MySuite) TestReinput(c *C) {
	e := httpexpect.New(c, url)         //创建一个httpexpect实例
	postdata := map[string]interface{}{ // 创建一个json变量
		"token":            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODc3Mjg5OTIsIm9wZW5pZCI6Im9QRktxNWU4MjMzZ1hqUmpkTDRPZFBDZlI5OXMifQ.56hSML25njbMJPuBgPZkqD7652oTeHjZ_sgVTbzqbIo",
		"apply_order_id":   "6040500014526",
		"reInput_order_id": "7672700016003",
		"reInput_count":    "80",
		"return_time":      "2020-04-21",
	}
	contentType := "application/json;charset=utf-8"
	e.POST("/reinput"). // post请求
				WithHeader("ContentType", contentType). // 定义头信息
				WithForm(postdata).                     //传入表单信息
				Expect().
				Status(http.StatusOK). // 判断请求是否200
				JSON().
				Object().                            // json body实例化
				Keys().Contains("ErrCode", "ErrMsg") // 检验是否包含ErrCode, ErrMsg

}

func (s *MySuite) TestStorage(c *C) {
	e := httpexpect.New(c, url)          //创建一个httpexpect实例
	querydata := map[string]interface{}{ // 创建一个json变量
		"token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODc3Mjg5OTIsIm9wZW5pZCI6Im9QRktxNWU4MjMzZ1hqUmpkTDRPZFBDZlI5OXMifQ.56hSML25njbMJPuBgPZkqD7652oTeHjZ_sgVTbzqbIo",
		"cas":    "8008-60-4",
		"purity": "化学纯",
		"specs":  "100ML",
	}
	e.GET("/storage"). // get请求
				WithQueryObject(querydata). // 传入query
				Expect().
				Status(http.StatusOK). // 判断请求是否200
				JSON().
				Object().                                            // json body实例化
				Keys().Contains("ErrCode", "ErrMsg", "Storage_data") // 检验是否包含ErrCode, ErrMsg, Storage_data
}

func (s *MySuite) TestOrder(c *C) {
	e := httpexpect.New(c, url)          //创建一个httpexpect实例
	querydata := map[string]interface{}{ // 创建一个json变量
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODc3Mjg5OTIsIm9wZW5pZCI6Im9QRktxNWU4MjMzZ1hqUmpkTDRPZFBDZlI5OXMifQ.56hSML25njbMJPuBgPZkqD7652oTeHjZ_sgVTbzqbIo",
	}
	e.GET("/order"). // get请求
				WithQueryObject(querydata). // 传入query
				Expect().
				Status(http.StatusOK). // 判断请求是否200
				JSON().
				Object().                                                        // json body实例化
				Keys().Contains("ErrCode", "ErrMsg", "InputOrder", "ApplyOrder") // 检验是否包含ErrCode, ErrMsg

}

func (s *MySuite) TestMsds(c *C) {
	e := httpexpect.New(c, url)          //创建一个httpexpect实例
	querydata := map[string]interface{}{ // 创建一个json变量
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODc3Mjg5OTIsIm9wZW5pZCI6Im9QRktxNWU4MjMzZ1hqUmpkTDRPZFBDZlI5OXMifQ.56hSML25njbMJPuBgPZkqD7652oTeHjZ_sgVTbzqbIo",
		"cas":   "8008-60-4",
	}
	e.GET("/msds"). // get请求
			WithQueryObject(querydata). // 传入query
			Expect().
			Status(http.StatusOK). // 判断请求是否200
			JSON().
			Object().                                          // json body实例化
			Keys().Contains("ErrCode", "ErrMsg", "Id", "Name") // 检验是否包含ErrCode, ErrMsg

}
