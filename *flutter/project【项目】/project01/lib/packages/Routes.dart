import 'package:flutter/material.dart';
import '../pages/LocationManager.dart';
import '../pages/DioTest.dart';
import '../pages/SwipperDemo.dart';
// 首页
import '../pages/tab/HomeTabPage.dart';
// web
import '../pages/custompage/WebViewPage.dart';

final Map routes = {
  '/': (context) => HomeTabPage(),
  '/location':(context) => LocationManager(),
  '/dio':(context) => DioTest(),
  '/swipper':(context) => SwipperDemo(),
  '/webpage':(context,{arguments}) => WebViewPage(arguments: arguments), 
  
  // 使用 Navigator.pushNamed(context, '/productInfo',arguments: {"id":'我是上个界面传过来的id'});
};

var onGenerateRoute = (RouteSettings settings) {
  final String name = settings.name;
  final Function pageContentBuilder = routes[name];
  if (pageContentBuilder != null) {
    if (settings.arguments != null) {
      final Route route = MaterialPageRoute(
          builder: (context) =>
              pageContentBuilder(context, arguments: settings.arguments));
      return route;
    } else {
      final Route route =
          MaterialPageRoute(builder: (context) => pageContentBuilder(context));
      return route;
    }
  }
};
