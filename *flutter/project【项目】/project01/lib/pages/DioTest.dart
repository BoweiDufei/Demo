import 'dart:io';

import 'package:demo02/packages/AlertDialog.dart';
import 'package:demo02/packages/DioManager.dart';
import 'package:demo02/packages/EasyMethods.dart';
import 'package:demo02/packages/ScreenAdaper.dart';
import 'package:flutter/material.dart';
import 'package:flutter_cupertino_date_picker/flutter_cupertino_date_picker.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:image_picker/image_picker.dart';

class DioTest extends StatefulWidget {
  @override
  _DioTestState createState() => _DioTestState();
}

class _DioTestState extends State<DioTest> {
  PickedFile pickedFile;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('DioTest'),
      ),
      body: Column(
        children: <Widget>[
          SizedBox(
            height: 20,
          ),
          Container(
            width: setWidth(200),
            height: setHeight(50),
            child: RaisedButton(
              child: Text('登录'),
              onPressed: () async {
                print('登录');
                String mobile = '13050584789';
                String password = '123456';
                Map params = {};
                params['mobile'] = mobile;
                params['password'] = password;
                DioManager().post('api/login', params, (data) {
                  print(data);
                }, (err) {
                  print(err);
                });
              },
            ),
          ),
          SizedBox(
            height: 20,
          ),
          Container(
            width: setWidth(200),
            height: setHeight(50),
            child: RaisedButton(
              child: Text('弹出提示'),
              onPressed: () async {
                print('弹出提示');
                showDialog(
                  context: context,
                  builder: (context) {
                    return DBWAlertDialog(
                        context, '您是否进入北京', '就是去不去北京', '取消', "确定", null, () {});
                  },
                );
              },
            ),
          ),
          SizedBox(
            height: 20,
          ),
          Container(
            width: 100,
            height: 100,
            child: this.pickedFile != null
                ? Image.file(File(this.pickedFile.path))
                : Text('暂无图片'),
          ),
          Container(
            width: setWidth(200),
            height: setHeight(50),
            child: RaisedButton(
              child: Text('弹出图片'),
              onPressed: () async {
                print('弹出selectImageFromPicker');
                // selectImageFromGallery((PickedFile pickedFile){
                //   setState(() {
                //     this.pickedFile = pickedFile;
                //   });
                // });
              },
            ),
          ),
          SizedBox(
            height: 20,
          ),
          Container(
            width: 100,
            height: 100,
            child: RaisedButton(
              child: Text('提示信息'),
              onPressed: () async {
                print('提示信息');
                
              },
            ),
          ),
        ],
      ),
    );
  }
}
