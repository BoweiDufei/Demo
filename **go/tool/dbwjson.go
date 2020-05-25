package tool

// json-iterator  号称最快的go json解析器。跟官方的写法兼容，我目前基本都使用这个解析器。
// tidwall/gjson 主要用来解析JSON。 不用再定义复杂结构，直接像其他语言一样根据Key来获取数据，方便很多。

import (
	"fmt"
	"github.com/json-iterator/go"
	"github.com/tidwall/gjson"
)

/**
将对象转为[]byte
 */
func DBWJsonMarshal(v interface{}) ([]byte, error) {
	fmt.Println("tool")
	var json_iterator = jsoniter.ConfigCompatibleWithStandardLibrary
	return json_iterator.Marshal(v)
}

/**
将[]byte转为对象

外部使用：
var jsonByte = []byte(`{"Name": "Platypus", "Order": "Monotremata"}`)
var animal Animal
err := tool.DBWJsonUnmarshal(jsonByte, &animal)
 */
func DBWJsonUnmarshal(data []byte, v interface{}) error {
	var json_iterator = jsoniter.ConfigCompatibleWithStandardLibrary
	return json_iterator.Unmarshal(data, &v)
}

/**
解析JSON。 能直接点出来想要的json数据，不用再建复杂的struct
const json = `{"name":{"first":"Janet","last":"Prichard"},"age":47}`
value := tool.GjsonGet(jsonStr,"name.first")
 */
func GjsonGet(jsonStr string, path string) string {
	value := gjson.Get(jsonStr, path)
	return value.String()
}

/**
随机数
 */