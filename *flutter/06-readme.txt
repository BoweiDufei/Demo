flutter 状态管理provider，这个是官方提供的状态管理解决方案使用起来比较方便
在不同组件之间实现传值和数据共享

https://pub.dev/packages/provider



一定要区分provider和provide 
使用provider的步骤
1，配置依赖  .yaml中
2，新建一个文件夹provider，放所有的状态管理文件
3，在provier中新建Counter.dart
4，在Counter.dart中新建一个类混入 ChangeNotifier
class Counter with ChangeNotifier{
  int _count = 0;
  int get count => _count;
  void increment(){
    _count++;
    notifyListeners(); //通知其他界面更新数据
  }
}
5，在main.dart中
引入provider
再引入../Counter.dart
写代码
MultiProvider(
  providers:[
    // 有多少写多少自定义类
    ChangeNotifierProvider(builder:(_)=>Counter()),
  ],
  child:MaterialApp()
)


tensorflow案例：
https://github.com/ranajit1996/flutter_tflite_mobilenet_demo






