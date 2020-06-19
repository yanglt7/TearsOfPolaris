// @APIVersion 1.0.0
// @Title beego Test API
// @Description beego has a very cool tools to autogenerate documents for your API
// @Contact astaxie@gmail.com
// @TermsOfServiceUrl http://beego.me/
// @License Apache 2.0
// @LicenseUrl http://www.apache.org/licenses/LICENSE-2.0.html
package routers

import (
	"tpl_api/controllers"

	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/login", &controllers.LoginController{})
	beego.Router("/auth", &controllers.AuthController{})
	beego.Router("/senduserinfo", &controllers.SendUserInfoController{})
	beego.Router("/apply", &controllers.ApplyController{})
	beego.Router("/input", &controllers.InputController{})
	beego.Router("/note", &controllers.NoteController{})
	beego.Router("/reinput", &controllers.ReInputController{})
	beego.Router("/storage", &controllers.StorageController{})
	beego.Router("/order", &controllers.OrderController{})
	beego.Router("/msds", &controllers.MSDSController{})
}
