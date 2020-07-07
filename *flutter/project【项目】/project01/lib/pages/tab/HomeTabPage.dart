import 'package:flutter/material.dart';
import '../custompage/FirstMainPage.dart';
import '../custompage/MinePage.dart';

class HomeTabPage extends StatefulWidget  {
  @override
  _HomeTabPageState createState() => _HomeTabPageState();
}


class _HomeTabPageState extends State<HomeTabPage> with AutomaticKeepAliveClientMixin {

  @override
  bool get wantKeepAlive => true;

  List<BottomNavigationBarItem> btmItems = [
    BottomNavigationBarItem(
      icon: Icon(Icons.home),
      title: Text('首页'),
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.person),
      title: Text('我的'),
    ),
  ];

  List<Widget> bodys = [
    FirstMainPage(),
    MinePage(),
  ];

  int _currentIndex = 0;


  @override
  Widget build(BuildContext context) {

    return Scaffold(
      body: IndexedStack(
        children: bodys,
        index: _currentIndex,
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: btmItems,
        currentIndex: _currentIndex,
        fixedColor: Colors.red,
        type: BottomNavigationBarType.fixed,
        onTap: (index){
          setState(() {
            _currentIndex = index;
          });
        },
      ),
    );
  }

}