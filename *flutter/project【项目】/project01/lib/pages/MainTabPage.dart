import 'package:flutter/material.dart';
import '../packages/ScreenAdaper.dart';
import '../models/SystemNormalModel.dart';

class MainTabPage extends StatefulWidget {
  @override
  _MainTabPageState createState() => _MainTabPageState();
}

class _MainTabPageState extends State<MainTabPage> {
  List<SystemNormalModel> _dataArray = [];

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    SystemNormalModel first = SystemNormalModel('1', '网络请求', false);
    SystemNormalModel second = SystemNormalModel('2', '本地测试', false);
    SystemNormalModel third = SystemNormalModel('3', 'dio', false);
    SystemNormalModel four = SystemNormalModel('4', '测试', false);
    _dataArray.addAll([first, second, third, four]);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('首页'),
      ),
      body: ListView.builder(
        itemCount: _dataArray.length,
        itemBuilder: (context, index) {
          SystemNormalModel model = _dataArray[index];
          return Card(
            child: InkWell(
              onTap: (){
                switch (int.parse(model.leftStr)) {
                  case 1: // 网络请求
                    {
                      print('网络请求');
                    }
                    break;
                  case 2: // 本地测试
                    {
                      print('本地测试');
                      Navigator.pushNamed(context, '/location');
                    }
                    break;
                  case 3: // 本地测试
                    {
                      print('本地测试');
                      Navigator.pushNamed(context, '/dio');
                    }
                    break;
                  case 4: // 本地测试
                    {
                      print('swipper');
                      Navigator.pushNamed(context, '/swipper');
                    }
                    break;
                  default:
                }
              },
              child: Container(
                height: setHeight(100),
                child: Row(
                  children: <Widget>[Text('${model.rightStr}')],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
