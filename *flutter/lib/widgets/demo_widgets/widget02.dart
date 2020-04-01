// 跳转路由进入方法
import 'package:flutter/material.dart';

class DemoSecondWidget extends StatefulWidget {
  final String titleStr;

  const DemoSecondWidget({Key key, this.titleStr}) : super(key: key);

  @override
  _DemoSecondWidgetState createState() => _DemoSecondWidgetState();
}

class _DemoSecondWidgetState extends State<DemoSecondWidget> {
  @override
  Widget build(BuildContext context) {
    return FractionallySizedBox(
      widthFactor: 1,
      heightFactor: 1,
      child: Container(
        decoration: BoxDecoration(color: Colors.yellowAccent),
        child: Center(
          child: Column(
            children: <Widget>[
              FractionallySizedBox(
                widthFactor: 1,
                child: Container(
                  height: 100,
                  decoration: BoxDecoration(
                    color: Colors.blue,
                  ),
                  child: Row(children: [
                    RaisedButton(
                        child: Text('返回'),
                        onPressed: () {
                          Navigator.pop(context,'我是返回值');
                        }),
                    Text('${widget.titleStr ?? "暂无"}')
                  ]),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
