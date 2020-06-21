import 'package:flutter/material.dart';

import '../pages/NoArgPages/ProductListPage.dart';
import '../pages/ArgPages/ProductDetail.dart';
import '../pages/ArgPages/Search.dart';
import '../tab/TabMainPage.dart';


final routers = {
  '/':(context)=>TabMainPage(),
  '/plist':(context)=>ProductListPage(),
  '/pdetail':(context,{arguments})=>ProductDetail(arguments:arguments),
  '/search':(context,{arguments})=>SearchPage(arguments:arguments),
};


var onGenerateRoute=(RouteSettings settings) {
      // 统一处理
      final String name = settings.name; 
      final Function pageContentBuilder = routers[name];
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

