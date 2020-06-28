import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'dart:io';

Widget DBWAlertDialog(
  BuildContext context,
  String titleStr,
  String msg,
  String cancelStr,
  String sureStr,
  void Function() cancelBlock,
  void Function() sureBlock,
) {
  if (Platform.isIOS) {
    // iOS弹出提示框
    return CupertinoAlertDialog(
      title: Text('$titleStr'),
      content: Text('$msg'),
      actions: <Widget>[
        FlatButton(
            onPressed: () {
              Navigator.pop(context);
              if (cancelBlock != null) {
                cancelBlock(); // 取消代码块
              }
            },
            child: Text('$cancelStr')),
        FlatButton(
            onPressed: () {
              Navigator.pop(context);
              if (sureBlock != null) {
                sureBlock(); // 确定代码块
              }
            },
            child: Text('$sureStr')),
      ],
    );
  } else {
    // 安卓弹出提示框
    return AlertDialog(
      title: Text('$titleStr'),
      content: Text('$msg'),
      actions: <Widget>[
        FlatButton(
            onPressed: () {
              Navigator.pop(context);
              if (cancelBlock != null) {
                cancelBlock(); // 取消代码块
              }
            },
            child: Text('$cancelStr')),
        FlatButton(
            onPressed: () {
              Navigator.pop(context);
              if (sureBlock != null) {
                sureBlock(); // 确定代码块
              }
            },
            child: Text('$sureStr')),
      ],
    );
  }
}
