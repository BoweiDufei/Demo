// 一般点击按钮字数增加的widget
import 'package:flutter/material.dart';
import './widget02.dart';
import './widget03.dart';
import 'dart:async';

class DemoFirstPlusWidget extends StatefulWidget {
  final int superNum;
  const DemoFirstPlusWidget({Key key, this.superNum}) : super(key: key);
  @override
  _DemoFirstPlusWidgetState createState() => _DemoFirstPlusWidgetState();
}

class _DemoFirstPlusWidgetState extends State<DemoFirstPlusWidget> {
  int currentNumber = 0; //当前数量

  @override
  void initState() {
    currentNumber = widget.superNum + 1;
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: FractionallySizedBox(
        widthFactor: 1,
        heightFactor: 1,
        child: Container(
          decoration: BoxDecoration(color: Colors.blue),
          child: Center(
              child: Container(
            width: 100,
            height: 200,
            decoration: BoxDecoration(color: Colors.greenAccent),
            child: Column(children: [
              RaisedButton(
                onPressed: () {
                  setState(
                    () {
                      currentNumber += 1;
                    },
                  );
                },
                child:
                    Text('数值为：${currentNumber} widgetNum=${widget.superNum}'),
              ),
              RaisedButton(
                onPressed: () async {
                  print('打印了');
                  var result = await Navigator.push(context,
                      MaterialPageRoute(builder: (context) {
                    return DemoSecondWidget(
                      titleStr: '我是上个界面传递的数据',
                    );
                  }));
                  print('下个个界面传递的数据：${result}');
                },
                child: Text('跳转路由'),
              ),
              RaisedButton(child: Text('跳转滚动界面'),onPressed: (){
                Navigator.push(context, MaterialPageRoute(builder: (context){
                  return DemoThirdWidget();
                }));
              })
            ]),
          )),
        ),
      ),
    );
  }
}
