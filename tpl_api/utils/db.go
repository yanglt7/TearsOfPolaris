package utils

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/astaxie/beego"
	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func InitMysql() {

	fmt.Println("InitMysql...")
	driverName := beego.AppConfig.String("driverName")

	//注册数据库驱动
	// orm.RegisterDriver(driverName, orm.DRMySQL)

	// 数据库连接
	user := beego.AppConfig.String("mysqluser")
	pwd := beego.AppConfig.String("mysqlpwd")
	host := beego.AppConfig.String("host")
	port := beego.AppConfig.String("port")
	dbname := beego.AppConfig.String("dbname")

	//dbConn := "root:ylt661810@tcp(127.0.0.1:3306)/tpl_api?charset=utf8"
	dbConn := user + ":" + pwd + "@tcp(" + host + ":" + port + ")/" + dbname + "?charset=utf8"

	db1, err := sql.Open(driverName, dbConn)
	// err := orm.RegisterDataBase("default", driverName, dbConn)
	if err != nil {
		fmt.Println("连接数据库失败")
		fmt.Println(err.Error())
	} else {
		fmt.Println("连接数据库成功")
		db = db1
	}
}

// 操作数据库(插入/更新)
func ModifyDB(sql string, args ...interface{}) (int64, error) {
	result, err := db.Exec(sql, args...)
	if err != nil {
		log.Println(err)
		return 0, err
	}

	count, err := result.RowsAffected()
	if err != nil {
		log.Println(err)
		return 0, err
	}

	return count, nil
}

// 按条件查询
func QueryRowDB(sql string) (*sql.Rows, error) {
	// return db.QueryRow(sql)
	return db.Query(sql)
}
