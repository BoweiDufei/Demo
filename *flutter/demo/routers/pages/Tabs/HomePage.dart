import 'package:flutter/material.dart';
class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('首页'),
      ),
      body: Center(
        child: Container(
          width: 100,
          height: 100,
          decoration: BoxDecoration(
            color: Colors.red
          ),
          child: RaisedButton(
            child: Text('跳转1'),
            onPressed: (){
              // Navigator.of(context).push(
              //   MaterialPageRoute(builder: (context)=>ProductListPage())
              // );
              Navigator.pushNamed(context, '/plist');
            }
          ),
        ),
      ),
    );
  }
}