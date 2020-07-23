vscode开发go语言 
插件：Chinese 汉化 / go



go语言项目一般流程：
############################################
mkdir XXXX
cd XXXX
go mod init XXXX
go get github.com/json-iterator/go
go get -u github.com/tidwall/gjson
############################################
//go get go.mongodb.org/mongo-driver/mongo
go mod 的包管理教程：https://www.jianshu.com/p/bbed916d16ea
引入包方法 import "XXXX/tool"
############################################
go语言很好的博客https://www.cnblogs.com/endurance9/p/10434738.html

举个栗子
****************************
package main
import "fmt"
func main() {
	fmt.Println("你好golang")
}




