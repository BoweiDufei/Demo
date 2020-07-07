import 'package:demo02/packages/ScreenAdaper.dart';
import 'package:demo02/packages/Storage.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class LocationManager extends StatefulWidget {
  @override
  _LocationManagerState createState() => _LocationManagerState();
}

class _LocationManagerState extends State<LocationManager> {
  String _valueStr = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CupertinoPageScaffold(
        backgroundColor: Colors.white,
        navigationBar: CupertinoNavigationBar(
          transitionBetweenRoutes: false,
          middle: Text('iOS13 Modal Presentation'),
          trailing: GestureDetector(
            child: Icon(Icons.arrow_forward),
            onTap: () => Navigator.of(context).pushNamed('ss'),
          ),
        ),
        child: ListView.builder(
          itemCount: 10,
          itemBuilder: (context,index){
            return Container(
              height: 100,
              child: Text('这是第${index}行'),
            );
          },
        ),
      ),
    );
  }
}
