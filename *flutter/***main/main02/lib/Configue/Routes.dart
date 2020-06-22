import 'package:flutter/material.dart';
import '../Pages/Product.dart';
import '../Tab/TabPage.dart';
import '../Pages/ProductDetailPage.dart';

final Map routes = {
  '/': (context) => TabPage(),
  '/product': (context) => Product(),
  '/productInfo': (context,{arguments}) => ProductDetailPage(arguments: arguments,), 
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
