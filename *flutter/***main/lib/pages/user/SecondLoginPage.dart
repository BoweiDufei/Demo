import 'package:flutter/material.dart';
import 'package:provide/provide.dart';
import '../../provide/current_index_provide.dart';

class SecondLoginPage extends StatefulWidget {
  @override
  _SecondLoginPageState createState() => _SecondLoginPageState();
}

class _SecondLoginPageState extends State<SecondLoginPage> with SingleTickerProviderStateMixin{

  AnimationController aniController;
  Animation<double> aniTween;
  
  @override
  void initState() {
    super.initState();
    aniController = new AnimationController(duration: Duration(seconds: 3),vsync: this);
    aniTween = Tween<double>(
      begin: 0.0,
      end: 200.0
    ).animate(aniController)..addListener(
      (){
        print('进入了吗');
        setState(() {
          
        });
      }
    );
  }

  @override
  Widget build(BuildContext context) {
        return Scaffold(
          appBar: AppBar(
            title: Text('第二控制器'),
          ),
          body: Container(
            child: Center(
              child: RaisedButton(
                child: Text('我是按钮${aniTween.value}'),
            onPressed: (){
              print('开始动画啦');
              aniController.forward();
            },
          ),
        ),
      ),
    );
  }

  dispose() {
    //路由销毁时需要释放动画资源
    aniController.dispose();
    super.dispose();
  }
}
