import 'package:flutter/material.dart';
import './WebContainer/DBWWebviewWidget.dart';

class CartPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: RaisedButton(
          child: Text('跳转web'),
          onPressed: (){
            print('-RaisedButton-');
            // Navigator.of(context).push(route)
            Navigator.push(context,
                MaterialPageRoute(builder: (context) {
              return DBWWebviewWidget(url: 'https://www.baidu.com',);
            }));
            print('-RaisedButton22-');
          },
        ),
      ),
    );
  }
}