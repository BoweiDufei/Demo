import 'package:flutter/material.dart';
import 'dart:math';

class DemoThirdWidget extends StatefulWidget {
  DemoThirdWidget({Key key}) : super(key: key);

  @override
  _DemoThirdWidgetState createState() => _DemoThirdWidgetState();
}

class _DemoThirdWidgetState extends State<DemoThirdWidget> {

  ScrollController _listViewScrollController = ScrollController(initialScrollOffset: 200);
  double alpha = 0;

  @override
  void initState() {
    super.initState();
    _listViewScrollController.addListener((){
      setState(() {
        double tmpScale = min(_listViewScrollController.offset/100, 1);
        alpha = max(tmpScale, 0);
      });
    });
  }

  @override
  void dispose() {
    _listViewScrollController.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return FractionallySizedBox(
      widthFactor: 1,
      heightFactor: 1,
      child: Container(
        decoration: BoxDecoration(color: Colors.yellow),
        child: Stack(
          children: <Widget>[
            ListView.builder(
              itemCount: 10,
              itemBuilder: (BuildContext context, int index) {
                return Container(
                  height: 100,
                  child: Text('当前数据：${index}'),
                );
              },
              controller: _listViewScrollController,
            ),
            Positioned(
              left: 10,
              right: 10,
              top: 20,
              child: Opacity(
               opacity: alpha,
               child: Container(
                 child: Text('这是啥啊'),
                 decoration: BoxDecoration(color: Colors.blue),
               ),
            ))
          ],
        ),
      ),
    );
  }
}
