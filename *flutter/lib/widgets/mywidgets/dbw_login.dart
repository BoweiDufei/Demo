import 'package:flutter/material.dart';
import 'package:provide/provide.dart';
import '../../provide/current_index_provide.dart';

class DBWLoginWidget extends StatefulWidget {
  @override
  _DBWLoginWidgetState createState() => _DBWLoginWidgetState();
}

class _DBWLoginWidgetState extends State<DBWLoginWidget> {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.yellow,
      child: Center(
        child: Container(
          width: 100,
          height: 100,
          child: RaisedButton(
            onPressed: () {
              print('onPress');
              Provide.value<CurrentIndexProvide>(context).login();
            },
            child: Text('登录'),
          ),
        ),
      ),
    );
  }
}
