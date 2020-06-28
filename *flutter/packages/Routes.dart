import 'package:flutter/material.dart';
import '../pages/MainTabPage.dart';
import '../pages/LocationManager.dart';

final Map routes = {
  '/': (context) => MainTabPage(),
  '/location':(context) => LocationManager(),
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
