import 'package:flutter/material.dart';

class ProductDetailPage extends StatefulWidget {

  Map arguments;
  ProductDetailPage({this.arguments});

  @override
  _ProductDetailPageState createState() => _ProductDetailPageState();
}

class _ProductDetailPageState extends State<ProductDetailPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('详情'),
      ),
      body: Center(
        child: Container(
          child: RaisedButton(
            child: Text('按钮-${widget.arguments}'),
            onPressed: (){
              print('返回');
              // Navigator.popUntil(context, );
              // Navigator.pushAndRemoveUntil(context, newRoute, (route) => false);
            }),
        ),
      ),
    );
  }
}
