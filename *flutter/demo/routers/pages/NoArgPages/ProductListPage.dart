import 'package:flutter/material.dart';

class ProductListPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('商品列表'),
      ),
      body: Center(
        child: Container(
          width: 100,
          height: 100,
          child: RaisedButton(
            child: Text('跳转2'),
            onPressed: (){
              // Navigator.pushNamed(context, '/pdetail',arguments: {
              //   'id':984302918935
              // });
              // Navigator.pushNamed(context, '/pdetail',arguments: {
              //   "pid":456
              // });
              
              //路由跳转
              Navigator.pushNamed(context, '/search',arguments: {
                "id":123
              });
            }
          ),
        ),
      ),
    );
  }
}