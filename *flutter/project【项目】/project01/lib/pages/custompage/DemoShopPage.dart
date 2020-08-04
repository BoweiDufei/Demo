import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../models/Counter.dart';

class DemoShopPage extends StatelessWidget {
  const DemoShopPage({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var count = context.watch<Counter>().count;
    return Container(
      child: Center(
        child: Text('DemoShopPage + ${count}'),
      ),
    );
  }
}
