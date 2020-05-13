import 'package:flutter/material.dart';
import '../pages/TabsPage.dart';
import '../pages/user/LoginPage.dart';
import '../pages/user/SecondLoginPage.dart';
import '../pages/MemberPage.dart';

//配置路由
final myRoutes={
    '/':(context)=>TabsPage(),
    '/login':(context,{arguments})=>LoginPage(arguments: arguments,),
    '/secondlogin':(context)=>SecondLoginPage(),
    '/member':(context)=>MemberPage(),
};


//固定写法
final onGenerateRoute=(RouteSettings settings) {
  // 统一处理
  final String name = settings.name; 
  final Function pageContentBuilder = myRoutes[name];

  print('settings = ${settings}');
  print('router = ${pageContentBuilder}');
  if (pageContentBuilder != null) {
    if (settings.arguments != null) {
      final Route route = MaterialPageRoute(
          builder: (context) =>
              pageContentBuilder(context, arguments: settings.arguments));
      return route;
    }else{
        final Route route = MaterialPageRoute(
          builder: (context) =>
              pageContentBuilder(context));
        return route;
    }
  }
};