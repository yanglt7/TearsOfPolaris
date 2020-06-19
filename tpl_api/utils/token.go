package utils

import (
	"fmt"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type jwtCustomClaims struct {
	jwt.StandardClaims

	// 追加自己需要的信息
	Openid string `json:"openid"`
}

/**
 * 生成 token
 */
func CreateToken(SecretKey []byte, openid string) (tokenStr string, err error) {
	claims := &jwtCustomClaims{
		jwt.StandardClaims{
			ExpiresAt: int64(time.Now().Add(time.Hour * 72).Unix()),
		},
		openid,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenStr, err = token.SignedString(SecretKey)
	return
}

/**
 * 解析 token
 */
func ParseToken(tokenStr string, SecretKey []byte) (claims jwt.Claims, err error) {
	var token *jwt.Token
	token, err = jwt.Parse(tokenStr, func(*jwt.Token) (interface{}, error) {
		return SecretKey, nil
	})
	claims = token.Claims
	return
}

func GetOpenid(token string, SecretKey string) (res string) {
	claims, err := ParseToken(token, []byte(SecretKey))
	if nil != err {
		fmt.Println("err: ", err)
	}
	openid := claims.(jwt.MapClaims)["openid"]
	fmt.Println(openid)
	res = openid.(string)
	return res
}

func CheckToken(token string, SecretKey string) (res int) {
	claims, err := ParseToken(token, []byte("Y_momo"))
	if nil != err {
		fmt.Println(" err :", err)
	}

	// 生成float64的时间戳
	tNow := float64(time.Now().Unix())

	// 将exp的时间戳转换成float64
	expTime := claims.(jwt.MapClaims)["exp"]
	var iexp float64
	iexp = expTime.(float64)

	if iexp > tNow {
		fmt.Println("exp > tNow")
		return 1
	} else {
		fmt.Println("exp < tNow")
		return 0
	}
}
