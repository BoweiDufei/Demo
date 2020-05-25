/**
使用说明
1，在项目中添加src目录
2，src中导入tool文件夹
3，设置GOPATH，具体实现https://studygolang.com/articles/4273
直接在命令行添加
 export GOPATH=/usr/local/src/go_path
4，导入工具类import "tool"EasyServerDemo
5，在src上级目录中运行main.go，一定是src上级，不是在src目录运行
*/
package tool

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

/******1，将结构体生成json (结构体成员首字母必须大写)或者通过map生成json**************************************************/
type IT struct {
	Staff Person `json:"staff"`
	Company string   `json:"company"`  /**此字段不会输出到屏幕*/
	Subjects []string   `json:"subjects"`
	IsOK bool   `json:"isOK"` /**将bool值转成字符串*/
	Price float64   `json:"price"`
}
type Person struct {
	Name string `json:"name"`
	Age int `json:"age"`
}
func TransformStructToJson()  {
	s:=IT{Company:"itcast",Subjects:[]string{"GO","C++","JAVA"},IsOK:true,Price:666.666,Staff:Person{Name:"张三",Age:45}}
	buf,err := json.Marshal(s)
	if err!=nil {
		fmt.Println(err)
	}else{
		word := string(buf)/**强转[]byte为string*/
		fmt.Println(word)
	}
}
func TransformMapToJson()  {
	m:=make(map[string]interface{},4)
	m["company"]="itcast"
	m["subjects"] = []string{"GO","JAVA","C++","C"}
	m["isOK"] = true
	m["price"] = 6666.6
	buf,err := json.Marshal(m)
	if err != nil {
		fmt.Println(err)
	}else{
		result:=string(buf)
		fmt.Println(result)
	}
}

/*******2，将json转结构体或者map ******************************/
func TransformJsonToStruct()  {
	words:=`{"staff":{"name":"张三","age":45},"company":"itcast","subjects":["GO","C++","JAVA"],"isOK":true,"price":666.666}`
	var myStruct IT
	err:=json.Unmarshal([]byte(words),&myStruct)
	if err != nil {
		fmt.Println(err)
	}else{
		fmt.Println(myStruct)
	}
}
func TransformJsonToMap()  {
	words:=`{"staff":{"name":"张三","age":45},"company":"itcast","subjects":["GO","C++","JAVA"],"isOK":true,"price":666.666}`
	m := make(map[string]interface{})
	err:=json.Unmarshal([]byte(words),&m)
	if err != nil {
		fmt.Println(err)
	}else{
		fmt.Println(m)
	}
}


/*******3，文件操作**********************************/
func ShowInfoOnScreen()  {
	//os.Stdout.Close()/**关闭标准输出后println就无法打印了*/
	//fmt.Println("stdOut")
	os.Stdout.WriteString("what are u 弄啥嘞\n")
	var a int
	fmt.Scan(&a) //从标准输入设备中读取内容，放在a里面
	fmt.Println(a)
}

const path = "../demo.txt"
func WriteFile()  {
	//1，打开文件
	f,err := os.Create(path)
	if err != nil {
		fmt.Println(err)
		return
	}
	//2，使用完毕，关闭文件
	defer f.Close()

	//3，写内容
	for i := 0; i < 10; i++ {
		f.WriteString(strconv.Itoa(i)+"\n")
	}
}
func ReadFile()  {
	//1，打开文件
	f,err := os.Open(path)
	if err != nil {
		fmt.Println(err)
		return
	}
	//2，关闭文件
	defer f.Close()

	//3，读取文件
	buf := make([]byte,1024*2)
	n,err1 := f.Read(buf)
	if err1 != nil && err1 != io.EOF{ /**文件还没结束(EOF文件出错，同时没有到结尾)*/
		fmt.Println(err1)
		return
	}
	fmt.Println("buf = " + string(buf[:n]))
}
/**拷贝文件*/
func CopyFileToOtherPath(from string,to string)  {
	if len(from)*len(to) == 0 {
		fmt.Println("请输入源文件的路径和目标文件路径")
		return
	}
	if from == to {
		fmt.Println("源文件和目标文件不能一样")
		return
	}
	//1，只读方式打开源文件
	fromFile,err := os.Open(from)
	if err != nil {
		fmt.Println(err)
		return
	}
	//2，新建目的文件
	toFile,err2 := os.Create(to)
	if err2 != nil {
		return
	}
	//3，关闭文件
	defer fromFile.Close()
	defer toFile.Close()

	//4，核心处理，从源文件读取内容往目的文件写，读多少写多少
	buf := make([]byte,1024*4)  //4K大小临时缓存区
	for{
		n,err := fromFile.Read(buf)
		if err!=nil{
			if err == io.EOF {
				//文件读取完毕
				break
			}
		}
		toFile.Write(buf[:n])
	}
}


/****4，channel实现同步**************************/
var channel = make(chan int)/**定义一个全局管道*/
func SyncPrintTwoWords()  {
	/**通过channel实现当world打印完成后再打印hello*/
	go printHello()
	go printWorld()
	for{}/**保命的for循环，主进程不会被杀死*/
}
func printWorld()  {
	printWords("World")
	channel<-66666 /**给管道写入数据，让其他等待的线程开始执行下去*/
}
func printHello()  {
	i := <-channel /**会堵塞进程，当管道里面被写入数据才会进行下去*/
	fmt.Println("获取得到管道传递的数据为"+strconv.Itoa(i))
	printWords("Hello")
}
func printWords(s string)  {
	/**打印*/
	for _,data := range s{
		fmt.Println(string(data))
	}
}

/**5，channel保命（不用在使用for{}死循环来保命了）*/
func SaveChildThread(){
	var ch = make(chan int)
	go func() {
		for i := 0; i < 100; i++ {
			fmt.Println("第"+strconv.Itoa(i)+"次打印 ")
		}
		ch<-0
	}()
	/**管道没数据，就阻塞*/
	c := <-ch
	fmt.Println("获取到的数据为:"+strconv.Itoa(c))
}

var enumChan = make(chan int)
var mainCh = make(chan int)

/******6，range遍历管道数据 ******************************************************/
func EnumGetChanInfo()  {
	go writeInfoToChannel()
	go readInfoFromChannel()
	<-mainCh
}
func writeInfoToChannel()  {
	for i := 0; i < 100; i++ {
		if i >= 99 {
			/**放开主线程*/
			fmt.Println("我写入了:"+strconv.Itoa(i))
			enumChan<-i
			mainCh<-0
		}else{
			fmt.Println("我写入了:"+strconv.Itoa(i))
			enumChan<-i
		}
	}
}
func readInfoFromChannel()  {
	for a := range enumChan{
		fmt.Println("我读取到了"+strconv.Itoa(a))
	}
}

/*******7，定时器*****************************/
func TimerTestDemo()  {
	//创建一个定时器，设置时间为2秒，2秒后往time通道中写入内容(当前时间)
	timer := time.NewTimer(2*time.Second)
	fmt.Println("当前时间为",time.Now())
	t := <-timer.C
	fmt.Println("过了两秒后的时间为",t)
}
func TimerDelayDemo()  {
	/**通过timer实现延迟功能*/
	fmt.Println("睡觉前")
	time.Sleep(2*time.Second)
	fmt.Println("睡觉后")
}
func SelectWithChannel()  {
	/**用select监听管道的数据流动*/
	go RunSelectMethod()
	go writeSelectMethod()
	go readSelectMethod()
	<-mainCh
}
func readSelectMethod()  {
	for a := range enumChan{
		fmt.Println("读取到了",a)
	}
}
func RunSelectMethod()  {
	select {
	case <-enumChan:
		{
		    fmt.Println("读取到信息",<-enumChan)
	    }
	case enumChan <-1:
		{
			fmt.Println("有人往管道写入了个1")
		}
	case enumChan <- 2:
		{
			fmt.Println("有人往管道写入了个2")
			mainCh<-0
		}
	default:
		{
			fmt.Println("默认方法")
		}
	}
}
func writeSelectMethod()  {
	for i := 0; i < 100; i++ {
		if i == 98 {
			enumChan<-1
		}else{
			enumChan<-i
		}
	}
}

/******************8，文件的传输****************************/
func ClientSendFileMethod(fromPath string) {
	if len(fromPath) == 0 {
		return
	}
	fromFile,err := os.Stat(fromPath)
	if err!=nil {
		return
	}
	fmt.Println(fromFile.Name())
	/**1，把名字传递给后台服务，如果后台返回OK就开始传*/
	conn,err := net.Dial("tcp",":8000")
	if err!=nil {
		fmt.Println(err)
		return
	}
	defer conn.Close()

	_,err = conn.Write([]byte(fromFile.Name()))
	if err != nil {
		fmt.Println(err)
		return
	}

	buf := make([]byte,1024*2)
	n,err := conn.Read(buf)
	if err != nil {
		return
	}
	result:=string(buf[:n])
	fmt.Println(result)

	if strings.Contains(result, "OK") {
		/**准备开始传递*/
		file,err := os.Open(fromPath)
		defer file.Close()
		if err != nil {
			return
		}
		buf:=make([]byte,1024*2)
		/**读取文件，读多少，就写多少*/
		for{
			n,err = file.Read(buf)
			if err != nil {
				if err == io.EOF {
					/**发送完成*/
					return
				}
			}
			conn.Write(buf[:n])
		}
	}
	/**调用方法 : tool.ClientSendFileMethod("../demo.txt") */
}
func ServerReceiveFileMethod()  {
	/**1，监听*/
	li,err := net.Listen("tcp","127.0.0.1:8000")
	if err != nil {
		return
	}
	defer li.Close()

	/**2，阻塞等待用户连接*/
	conn,err := li.Accept()
	if err != nil {
		fmt.Println(err)
		return
	}
	/**3，发送OK*/
	defer conn.Close()

	/**4，准备接受*/
	buf:=make([]byte,1024*2)
	n,err := conn.Read(buf)
	word := string([]byte(buf[:n]))
	if len(word) >0 {
		fmt.Println("接收到的文件为"+word)
		file,err := os.Create("/Users/duxingya/Desktop/"+word)
		if err != nil {
			fmt.Println(err)
			return
		}
		conn.Write([]byte("OK"))

		for{
			n,err := conn.Read(buf)
			if err != nil {
				if err == io.EOF {
					fmt.Println("接受完成")
					return
				}else{
					fmt.Println(err)
				}
			}
			file.Write(buf[:n])
		}
	}


}


/*******9，http开发*****************************************/
func HttpServerEasyDemo() {
	//注册处理函数，用户连接，自动调用指定的处理函数
	http.HandleFunc("/hello", HelloServer)
	err := http.ListenAndServe(":12345", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
func HelloServer(w http.ResponseWriter, req *http.Request) {
	//w，给客户端回复数据，req，读取客户端发送的数据
	fmt.Println(req.Method+"\n")
	fmt.Println(req.URL.String()+"\n")
	fmt.Println(req.Header)
	fmt.Println(req.Body)
	w.Write([]byte("给客户发送的数据"))
}
func HttpClientEasyDemo() {
	/**客户端代码*/
	resp,err := http.Get("http://www.baidu.com")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer resp.Body.Close()

	/**读取body的内容，关键是 resp.Body.read*/
	buf := make([]byte,1024*2)
	var temp string
	for{
		n,err:=resp.Body.Read(buf)
		fmt.Println(string(buf[:n]))
		if err != nil {
			if err == io.EOF {
				break
			}else{
				fmt.Println(err)
			}
		}
		if n == 0 {
			fmt.Println("err",err)
			break
		}
		temp += string(buf[:n])
	}
	fmt.Println(temp)
}

/**
爬虫四个步骤
1，明确目标
2，爬 -- 将所有的网站内容全部爬下来
3，取 -- 去掉对我们没用的数据
4，处理数据 -- 按照我们想要的方式存储和使用
百度贴吧
https://tieba.baidu.com/f?kw=%E7%BB%9D%E5%9C%B0%E6%B1%82%E7%94%9F&ie=utf-8&pn=0
https://tieba.baidu.com/f?kw=%E7%BB%9D%E5%9C%B0%E6%B1%82%E7%94%9F&ie=utf-8&pn=50
https://tieba.baidu.com/f?kw=%E7%BB%9D%E5%9C%B0%E6%B1%82%E7%94%9F&ie=utf-8&pn=100
*/
func HttpBaiduTiebaSearchEngine(startNum int, endNum int)  {
	//startNum - 开始页
	//endNum - 终止页
	if startNum * endNum <0{
		fmt.Println("不能是负数")
		return
	}
	fmt.Println("正在爬取")
	myCh := make(chan int)
	for i := 0; i < (endNum - startNum); i++ {
		go downAllWebInfomation(i,myCh)
	}
	/**用管道和for循环保活，代码更优雅*/
	for i := 0; i < (endNum - startNum); i++ {
		<-myCh
	}

	fmt.Println("结束")
}
func downAllWebInfomation(page int,myCh chan int)  {
	url := "http://tieba.baidu.com/f?kw=%E7%BB%9D%E5%9C%B0%E6%B1%82%E7%94%9F&ie=utf-8&pn="+strconv.Itoa(page*50)
	result,err := getWebInfomation(url)
	if err != nil {
		fmt.Println(err)
		return
	}
	/**把内容写入到文件*/
	path := "../"+strconv.Itoa(page)+".html"
	file,err := os.Create(path)
	defer file.Close()
	if err != nil {
		fmt.Println(err)
		return
	}
	_,err = file.Write([]byte(result))
	if err == nil {
		fmt.Println("jieshu")
		myCh<-page
	}
}
func getWebInfomation(url string)(result string,err error) {
	resp,err := http.Get(url)
	defer resp.Body.Close()
	if err != nil {
		return
	}
	buf := make([]byte,1024*2)
	for{
		n,err := resp.Body.Read(buf)
		if err != nil {
			if err == io.EOF {
				break
			}else{
				fmt.Println(err)
			}
		}
		if n == 0 {
			break
		}
		result += string(buf[:n])
	}
	return
}


/********10，beego框架的学习********************************/
/**
不用go get 安装第三方，可以使用源码安装 https://studygolang.com/articles/14589
官网 https://beego.me/
作用是用于快速开发网站
MVC的架构，应用非常广发的体系架构，可以让程序的结构更加清晰合理
使用方法
1，安装beego和bee的开发工具
go get -v -u github.com/astaxie/beego
go get -v -u github.com/beego/bee
(
  github卡顿解决办法
  vim /etc/hosts
    192.30.253.112 github.com
    151.101.185.194 github.global.ssl.fastly.net
)
安装完之后，bee 可执行文件默认存放在 $GOPATH/bin 里面，
所以您需要把 $GOPATH/bin 添加到您的环境变量中，才可以进行下一步。(beego官网上有教程)
mac环境变量的设置 https://www.jianshu.com/p/463244ec27e3
2，创建工程
bee new classOne (注意该命令必须在 $GOPATH/src 下执行)

3，执行 bee run （注意该命令必须在 $GOPATH/src/appname 下执行）
*/
func BeegoController(){
	//路由，在router.go中配置
	//beego.Router("/user/?:id", &controllers.UserController{},"get:ShowGet;post:Post")
	//在控制器中获取  id := this.GetString(":id")
	//beego中静态html页面的设置为： 在main.go文件中添加此代码 beego.SetStaticPath("/static","public")
	//然后将所有的静态html文件放在public文件中即可
	//获取GET请求?name=feixiang拼接的参数非常简单 name := this.GetString("name") 去掉上面的两个点即可
	//还有一种方法 desc := c.Input().Get("desc")
	//输出：c.Ctx.WriteString(string(desc))
}

/**数据库*/
func DealWithMySqlite()  {
	/**0，目前数据库账号密码为:  root  ， 123456 ,  IP:127.0.0.1:3306*/
	/**1，找回数据库账号密码 https://blog.csdn.net/gooooooal/article/details/54836538 如何修改密码 */
	/**2，数据库的基本操作 https://blog.csdn.net/Devildezen/article/details/89852661*/

	/**3，登录数据库 mysql -u root -p123456 */
	/**4，show databases; 查找所有数据库*/
	/**5, create database class1 charset=utf8; 新建数据库*/
	/**5.1，drop database userInfo; 删除数据库**/
	/**6, use test; 使用新建的数据库*/
	/**7，show tables; 查看所有表**/
	/**8，drop table userInfo; 删除userInfo这个表**/
	/**9，desc userInfo; 查询表结构**/
	/**10，select * from student; 查询表数据**/



	/**ORM操作方法*******/
	//orm.Debug = true 开启调试功能
	/**1，下载数据库驱动 go get -u github.com/go-sql-driver/mysql*/
	/**2，下载ORM  go get github.com/astaxie/beego/orm
	/**861238498
	woaini949
	conn,err := sql.Open("mysql","root:123456@tcp(127.0.0.1:3306)/class1?charset=utf8")
	/**使用ORM连接数据库
	/**1：import导入自己的数据库*/
	/**
	import {
		_ "github.com/go-sql-driver/mysql"
	}
	/**2：
	/**建立数据库连接
	err := orm.RegisterDataBase("default", "mysql", "root:123456@tcp(127.0.0.1:3306)/class1?charset=utf8")
	*/
	/**3：关联将要操作的表 （Beego——自动创建表的文章：https://blog.csdn.net/CSDN_FlyYoung/article/details/87876503）
		orm.RegisterModel(new (UsersInfo))
	*/
	/**4：数据库增删改查操作：https://beego.me/docs/mvc/model/object.md
	*/
}