import 'package:flutter/material.dart';

import '../pages/Tabs/HomePage.dart';
import '../pages/Tabs/CollectionPage.dart';
import '../pages/Tabs/PersonCenter.dart';

class TabMainPage extends StatefulWidget {
  TabMainPage({Key key}) : super(key: key);

  @override
  _TabMainPageState createState() => _TabMainPageState();
}

class _TabMainPageState extends State<TabMainPage> {

  List<Widget> bodyList = [
    HomePage(),
    CollectionPage(),
    PersonCenter()
  ];

  List<BottomNavigationBarItem> btmItems = [
    BottomNavigationBarItem(icon: Icon(Icons.home),title: Text('首页')),
    BottomNavigationBarItem(icon: Icon(Icons.collections),title: Text('收藏')),
    BottomNavigationBarItem(icon: Icon(Icons.person),title: Text('个人')),
  ];

  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: this.bodyList[this._currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        items: this.btmItems,
        currentIndex: this._currentIndex,
        onTap: (index){
          setState(() {
            this._currentIndex = index;
          });
        },
      ),
    );
  }
}