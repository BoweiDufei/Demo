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



函数、方法
*****************************************
返回类型 方法名称（参数1，参数2...）{
  return 返回值；
}
// 例子
int sumNum(int n){
  var sum = 0;
  return sum;
}
可选参数：参数可有可无，使用[] 放在参数最后面
int userInfo(String username,[int age]){
  // age就是可选参数
  if (age != null){
    // 判断如果有age参数，执行这个方法体
  }
  return 20;
}

// 默认参数，在设置形参的时候后面添加 = ''  即可
只能在可选参数中使用 默认参数 或者 命名参数
int userInfo(String username,[int age=20]){
}
一般把带有默认参数的参数放在可选参数的前面
int userInfo(String username,[int age=20, int sex]){
}

**************命名参数  {}
void getUserInfo(String name, {int age = 18}){}
调用方法的时候，要加上age
getUserInfo('阿杜', age: 20);

**********************************
把方法当做参数 传递到另一个方法中
void fn2(int Function() fnName) {

}
参数fnName的类型是 int Function() 

箭头函数只能有一句代码 (v)=>print('aa')




对象和类
********************************************************************
dart中所有东西都是对象，所有对象都是继承自Object类
dart是一门实用类的单继承的面向对象语言，所有逇对象都是
类的实例，并且所有类都是object的子类
一个类通常由属性和方法组成。
定义类放在main(){}外面
通过class 方法来实现
class 类名称 {}
类名称首字母要大写

给类添加属性  
String name;
int age = 23;

给类添加方法
void getInfo(){
  print("方法名字 ${this.name}");
}

// 获取对象的属性 使用 this.属性名

实例化类
var p1 = new Person();
p1.name;
p1.getInfo(); // 调用方法

********************************************************************
构造函数
class Person{
  String name;
  int age;
  Person(String name,int age){
    this.name = name;
    this.age = age;
  }
}

// 使用构造函数
Person p = new Person('张三',18);

构造函数简写 （重要）
Person(this.name, this.age);

********************************************************************
命名构造函数，在dart中，构造函数可以写多个
比如 var d = new DateTime.now(); // now()就是命名构造函数

class Person{
  String name;
  int age;
  Person.now(){
    // 命名构造函数
    print('我是命名构造函数');
  }
}

调用命名构造函数
Person p = new Person.now();

私有属性 要在属性名前加上_
比如 String _name;
同理，私有方法也一样。

********************************************************************
get属性
class Rect{
  double height;
  double width;
  get area{ // get属性 (计算属性) ，其实就是 一个方法，去掉了() 加上了个get
    return this.height*this.width;
  }
}

调用  r.area 直接通过访问属性的方法来调用
Rect r = new Rect();
r.height = 20;
r.width = 10;
print('面积为：${r.area}');

set方法
set setRectHeight(double h) {
  this.height = h;
}
调用 r.setRectHeight = 30; 其实就是给属性赋值的方式来实现
Rect r = new Rect();
r.setRectHeight = 20; // 而不是 r.setRectHeight(20)

自己写的时候可以不用set和get 但是别人写的要看懂
********************************************************************
初始化列表
在写构造函数的时候，可以直接赋予初始值
Rect():height=2,width=10{} // 初始化之前执行赋值操作




********************************************************************
抽象类，多态，接口
抽象类：Dart抽象类主要用于定义标准，子类可以继承抽象类，也可以实现抽象类接口
1，通过abstract关键字来定义
2，抽象类不能被实例化，只有继承他的子类可以
3，抽象方法不能使用abstract声明， Dart中没有方法体的方法，被称为抽象方法
4，如果子类继承抽象类，必须要实现里面的抽象方法。

在dart里面，定义抽象类和定义接口基本一样

案例：定义一个Animal类，要求他的子类必须要包含eat方法
1, 定义一个抽象类
abstract class Animal{
  eat(); // 这就是抽象方法
}
2, 定义一个类 继承 这个 抽象类
class Dog extends Animal{
  @override
  eat(){
    print('dog eat');
  }
}

抽象类里面也可以有普通方法，子类继承后可以直接调用
abstract class Animal {
  eat();
  printInfo() {
    print('普通方法');
  }
}
********************************************************************
多态：允许将子类类型的指针赋值给父类类型的指针，同一个函数调用会有不同的执行效果
子类的实例赋值给父类的引用
多态就是父类定义一个方法不去实现，让继承他的子类去实现，每个子类有不同的表现。
比如 上面的例子就是
abstract class Animal {}
class Dog extends Animal{}
class Cat extends Animal{}

在main中调用 
Animal d = new Dog();
Animal d = new Cat();
********************************************************************
接口，
dart的接口没有interface关键字定义接口，而是普通类或者抽象类都可以作为接口被实现。
同样适用implements关键字进行实现。
但是dart的接口比较奇怪，如果实现的类是普通类，会将普通类和抽象类的属性的方法全部复写一遍。
而因为抽象类可以定义抽象方法，普通类不可以，所以一般要实现像Java接口那样的方式，一般会使用抽象类
建议使用抽象类定义接口

实现接口使用implements ， 要实现接口中的所有方法
abstract class Db{
  add();
  save();
  delete();
}
class MySql implements Db{
  add(){}
  save(){}
  delete(){}
}

********************************************************************
dart中一个类实现多个接口 ，需要重写接口的所有抽象方法
class C implements A,B{

}
********************************************************************
maxin 混入，就是在类中混入其他功能
在Dart中可以使用mixins实现类似多继承的功能

1，作为mixins的类，只能继承Object 不能继承其他类
2，作为mixins的类 不能有构造函数
3，一个类可以混入多个mixins类
4，mixins绝不是继承，也不是接口，而是一种全新的特性

class A {
  printAMethod() {
    print('A');
  }
}

class B {
  printBMethod() {
    print('B');
  }
}

class C with A, B {}

print(c is A);  // true
print(c is B);  // true
print(c is C);  // true

C拥有A和B的所有方法
同时，后面的方法会覆盖前面的方法

类继承后 调用父类构造函数方法
C(String name, num age) : super(name, age)


********************************************************************
泛型
泛型就是解决类、接口、方法的复用性，以及对不特性数据类型的支持（类型校验）
泛型函数、泛型方法
T getData<T>(T value) {
  return value;
}
T可以是任意值
调用的时候可以指定类型 var value = getData<String>('a');
表示把String赋值给了T

泛型类
List就是个泛型类
class PrintClass<T>{

}
只需要在类名字后面添加<T>即可，在实现方法中，需要泛型的地方用T替换
使用的时候
PrintClass a = new PrintClass<String>();

泛型接口
定义一个泛型接口和定义一个泛型类是一样的。
实现数据缓存的功能：有文件缓存，内存缓存。
内存缓存和文件缓存按照接口的约束实现。
1，定义一个泛型接口，约束实现它的子类必须有getByKey(key)和setByKey(key,value)
2，要求setByKey的时候，value的类型和实例化子类的时候指定的类型一致。

// 定义泛型接口
abstract class Cache<T>{

}
// 实现泛型接口
class FileCache<T> implements Cache<T>{

}
class MemoryCache<T> implements Cache<T>{

}

使用泛型接口的类
MemoryCache m = new MemoryCache<String>();

********************************************************************
库：https://pub.dev/


********************************************************************
类的静态成员
1，使用static 关键字类实现类级别的变量和函数
2，静态方法不能访问非静态成员，费静态方法可以访问静态成员。
class Person {
  static String name = "张三"; // 静态属性
  static void show(){  // 静态方法
    print(name);
  }
}

关键，只需要在属性和方法前面添加static即可


访问静态方法和属性
print(Person.name);
Person.show();




