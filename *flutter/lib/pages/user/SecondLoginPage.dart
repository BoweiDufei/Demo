import 'package:flutter/material.dart';
import 'package:provide/provide.dart';
import '../../provide/current_index_provide.dart';

class SecondLoginPage extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('第二个登录'),
      ),
      body: Container(
        child: Center(
          child: RaisedButton(
            child: Text('返回'),
            onPressed: (){
              // 选中第二个
              Provide.value<CurrentIndexProvide>(context).changeIndex(2);
              Navigator.of(context).popUntil(ModalRoute.withName('/'));
              // 返回根目录
              // Navigator.of(context).pushAndRemoveUntil(
              //   new MaterialPageRoute(builder: (context) => TabsPage()),
              //   (route) => route == null
              // );
            },
          ),
        ),
      ),
    );
  }
}