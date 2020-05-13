import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: RaisedButton(
          child: Text('进入登录中心'),
          onPressed: (){
            bool flag = false;
            if(flag){
              Navigator.pushNamed(context, '/secondlogin');
            }else{
              Navigator.pushNamed(context, '/login');
            }
            // Navigator.pushNamed(context, '/login', arguments: {
            //   "mobile": "13040304633"
            // });
          },
        ),
      ),
    );
  }
}