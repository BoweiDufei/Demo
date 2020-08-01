dart语言官网 https://dart.dev/
安装dart https://dart.dev/get-dart
查看是否安装成功  dart --version

vscode
插件 dart 和  code runner
************************************************

入口函数是 main(){
  printf("abcd");
}
右键 - Run Code 来执行dart语言
注意：代码结束后 一定要添加 ；
入口函数可以是 main(){}  也可以 void main(){} 表示main方法没有返回值

************************************************
变量的声明 可以使用var关键词，也可以使用 String 类型关键词
var 会自动类型推断，可以定义任意类型，建议要指定类型

  var a = '你好';
  String b = '你也好';
  int c = 100;

常量的定义 final 和 const
区别：const值不变，一开始就要赋值  final可以开始不赋值，只能赋值一次
而final不仅有const的编译时常量的特性，最重要的是他是运行时常量，并且final是
惰性初始化，即在运行时第一次使用前才初始化。
final更加强大


  const PI = 3.14159;
  final String name = "你好";
  // const time = new DateTime.now(); // 报错
  final time2 = new DateTime.now(); // 正确
  
************************************************
数据类型
Numbers 
   ***int
   ***double
Strings
   ***String 
Booleans布局
   ***bool 
List 数组
Maps 字典

*** 字符串
1，字符串类型 可以是 单引号 也可以是 双引号，都是可以的
三个单引号也可以定义字符串类型 ''' aaa  '''
三个单引号可以定义多行字符串
2，字符串的拼接有两种方式
第一种使用 双引号和${}配合
String c = "${a} +++ ${b}";
第二种是 使用 + 来实现
String c = a + " " + b;
各有优缺点

判断两个字符串是否相等使用 ==

***** Numbers 类型
int a = 123;
double b = 23.5;
判断两个int类型是否相等 也是 ==

***** bool  
true/false
不能赋予整行，跟oc不一样

***** List 集合类型
定义数组也有两种方法
1，var l1 = ['a', 'b', 'c'];
2，var l2 = new List();
l2.add() 新增
l2.removeAt()
l2.sort()
l2.indexOf()
l2.insert()

获取数组长度  l2.length
获取数组中某个元素 l2[1]

如果要求，list里面数据为某一类型，不能是其他类型 （重要）
可以使用泛型来定义list 
var l3 = new List<String>(); // list数据只能是String
遍历l3，可以使用 for(int i=0;i<l3.length;i++){} 这种方法来实现。


***** Maps类型 
定义maps的方式
1， 
var person = {
  "key":"value",
  "work":["程序员","外卖员"],
};
2， 使用new方式来定义map  
var person = new Map();
verson["key"] = "value";

（非常重要）
注意：map中类型，左侧的key必须是要带有“” 的，这点跟js中的不太一样
访问maps对象，也不能使用person.name来访问，而是要使用person["name"] 来访问
这个跟js也完全不一样 （非常重要）

类型判断，可以使用is来实现
有时候我们并不知道一个数据是什么类型，比如数据是从服务器返回的
就要使用判断类型 （重要）
bool result1 = person is Map;
bool result2 = person is String;
bool result3 = person is bool;
bool result4 = person is double;
bool result5 = person is int;


运算符和类型转换
**********************************************************
***************************** （重要）

+、-、*、/、
~/ 取整
% 取余
逻辑运算符 !取反 、  && 、 ||

判断两个数值是否相等 ==

赋值运算 ??= （重要）
int b;
b??=23; // 如果b为空，就会把23赋值给b
print(b) 
同样 ??也是这么个逻辑
var a;
var b = a ?? 10;
b 的值为 10

字符串转int      int.parse(numStr);
字符串转double   double.parse(numStr);
int 转字符串     numInt.toString();
double转字符串   doubleStr.toStringAsFixed(2); // 保留小数尾数
注意，如果int.parse('') 转换的数据为空字符串，会发生错误
这个时候要使用try{}catch(){}来解决

switch可以判断字符串

switch(a){
  case '男':{
  }
  break;
  default:
  breask;
}

判断是否为空
var num;
if (num == null){}

var myNum = 0/0; // 判断是否是NaN
if (myNum.isNaN){

}

在赋值运算里面，如果++ -- 写在前面，这个时候先运算再赋值，
如果++ -- 写在后面，先运算再赋值
b = a++;
b = ++a;
结果是不一样的



***************************************************************
***************************************************************
list属性
.length 长度
.isEmepty 是否为空
.reversed 数组翻转，对列表倒序排序

var mylist = list.reversed.toList(); // 获取倒序翻转的数组
新增数据
list.add('a') // 添加单一元素
list.addAll(['a', 'b']); //拼接数组 将一个数组中的所有数据元素添加在list中
list.indexOf('苹果'); // 查找数组中是否含有某元素，查找不到返回-1
list.remove('a'); // 删除第一个为"a" 的元素
list.removeWhere((a) {
    return a == 'a';
  });  // 删除所有为'a' 的元素
list.removeAt(0); // 删除list 中第几个元素
将list转为String 
list.join(' - ');
将字符串转为List
var words = str.split('-');

*****set类型 不允许重复的集合
var s = new Set();
s.add();

将某个数组中的数据去重
List a = ['a','b','a'];
var s = new Set();
s.addAll(a);
List c = s.toList();

Maps字典是无序的键值对
常用属性：
keys        获取所有key值
values      获取所有value值
isEmpty     是否为空
isNotEmpty  是否不为空
常用方法：
remove(key)  // 删除键值对
addAll({...})  // 新增多个键值对
containsValue    // 是否包含某个 value
forEach     // 遍历

常用的循环数据方法，set、list、map通用
for...
map 
where  // 把满足条件的返回
any 
every

例子：修改List中每个元素的值，并返回一个新的数组
var result = list.map((value){
  return value*2;
}).toList();

var result2 = list.where((value){
  return value>2;
}).toList(); // 将满足条件的返回

var result3 = list.any((value){
  return value>4;
}); // 只要集合中有一个满足条件，就返回true

var result3 = list.every((value){
  return value>4;
}); // 只要集合每一个都要满足条件，就返回true


