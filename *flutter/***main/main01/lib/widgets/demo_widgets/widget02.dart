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
                  child: _items(context),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget _items(BuildContext context){
    List<Widget> list = [];
    int num = 6;
    for (var i = 0; i < num; i++) {
      list.add(createContain(i,context));
    }
    return Row(
      children: list,
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
    );
  }

  Widget createContain(int index,BuildContext context){
    return Container(
      decoration: BoxDecoration(
        color: Colors.redAccent
      ),
      width: 100,
      height: 100,
      child: RaisedButton(
        onPressed: (){
          Navigator.pop(context);
        },
        child: Text('${index}号'),
      ),
    );
  }
}
