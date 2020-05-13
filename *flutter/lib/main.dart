import 'package:flutter/material.dart';
import './config/index.dart';
import './provide/current_index_provide.dart';
import 'package:provide/provide.dart';
import 'routers/Routers.dart';
import './pages/HomePage.dart';

/**
  flutter_swiper: ^1.1.6
  flutter_screenutil: ^0.5.2
  common_utils: ^1.1.1 
  dio: ^2.1.2
  url_launcher: ^5.0.1
  flutter_easyrefresh: ^1.2.7
  provide: ^1.0.2
  fluttertoast: ^3.0.1
  fluro: ^1.4.0
  flutter_html: ^0.9.6
  sqflite: ^1.1.0
  shared_preferences: ^0.5.1
 */

void main(){
  var currentIndexProvide = CurrentIndexProvide();
  var providers = Providers();
  providers
    ..provide(Provider<CurrentIndexProvide>.value(currentIndexProvide));
  runApp(ProviderNode(child: MyApp(),providers: providers,));
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: KString.mainTitle,//flutter女装商城
      debugShowCheckedModeBanner: false,
      //主题
      theme: ThemeData(
        primarySwatch: KColor.primaryColor,
      ),
      routes: myRoutes,
      initialRoute: '/', //初始化的时候加载的路由
      onGenerateRoute: onGenerateRoute,
    );
  }
}

