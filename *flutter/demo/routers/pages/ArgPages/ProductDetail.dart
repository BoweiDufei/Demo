import 'package:flutter/material.dart';

class ProductDetail extends StatelessWidget {
  final Map arguments;

  const ProductDetail({Key key, this.arguments}) : super(key: key);

  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('商品详情'),
      ),
      body: Center(
        child: Container(
          child: Text('商品详情= ${arguments}'),
        ),
      ),
    );
  }
}