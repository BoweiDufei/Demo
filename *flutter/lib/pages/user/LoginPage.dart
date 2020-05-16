import 'package:flutter/material.dart';
import '../TabsPage.dart';

class LoginPage extends StatelessWidget {

  final Map arguments;
  const LoginPage({Key key, this.arguments}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('登录'),
      ),
      body: Container(
        child: Center(
          child: RaisedButton(
            child: Text('跳转到第二部登录'),
            onPressed: (){
              // print('${this.arguments}');
              Navigator.pushNamed(context, '/secondlogin');
            },
          ),
        ),
      ),
    );
  }
}