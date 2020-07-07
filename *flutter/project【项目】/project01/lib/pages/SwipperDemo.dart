import 'package:demo02/packages/ScreenAdaper.dart';
import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';

class SwipperDemo extends StatefulWidget {
  @override
  _SwipperDemoState createState() => _SwipperDemoState();
}

class _SwipperDemoState extends State<SwipperDemo> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('SwipperDemo'),
      ),
      body: Column(
        children: <Widget>[
          Container(
            width: double.infinity,
            height: setHeight(200),
            child: Swiper(
              itemCount: 10,
              itemBuilder: (context,index){
                return Image.network('https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png');
              },
            ),
          )
        ],
      ),
    );
  }
}