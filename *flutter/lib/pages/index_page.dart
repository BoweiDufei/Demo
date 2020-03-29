import 'package:provide/provide.dart';
import 'package:flutter/material.dart';
import '../config/index.dart';
import './home_page.dart';
import './category_page.dart';
import './cart_page.dart';
import './member_page.dart';
import '../provide/current_index_provide.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class IndexPage extends StatelessWidget {
  final List<BottomNavigationBarItem> btmTabs = [
    BottomNavigationBarItem(
      icon: Icon(Icons.home),
      title: Text(KString.homeStr)
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.category),
      title: Text(KString.categoryStr)
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.shopping_cart),
      title: Text(KString.cartStr)
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.person),
      title: Text(KString.memberStr)
    )
  ];

  final List<Widget> tabBodies = [
    HomePage(),
    CategoryPage(),
    CartPage(),
    MemberPage()
  ];

  @override
  Widget build(BuildContext context) {
    //屏幕适配
    ScreenUtil.instance = ScreenUtil(width: 750,height: 1334);
    return Provide<CurrentIndexProvide>(
      builder: (context,child,val){
        //获取到当前索引状态值
        int currentIndex = Provide.value<CurrentIndexProvide>(context).currentIndex;
        return Scaffold(
          backgroundColor: Colors.white,
          bottomNavigationBar: BottomNavigationBar(
            type: BottomNavigationBarType.fixed,
            currentIndex: currentIndex,
            items: btmTabs,
            onTap: (index){
              Provide.value<CurrentIndexProvide>(context).changeIndex(index);
            },
          ),
          body: IndexedStack(
            index: currentIndex,
            children: tabBodies,
          ),

        );
      },
    );
  }
}