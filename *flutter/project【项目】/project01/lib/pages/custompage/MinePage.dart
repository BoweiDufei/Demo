import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../models/Counter.dart';

class MinePage extends StatefulWidget {
  @override
  _MinePageState createState() => _MinePageState();
}

class _MinePageState extends State<MinePage> {
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    print('object');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('我的'),
        elevation: 0.0,
      ),
      body: Container(
        color: Colors.yellow,
        child: Center(
          child: FlatButton(
              onPressed: () {
                context.read<Counter>().increamCount();
              },
              child: Text('增加')),
        ),
      ),
    );
  }
}
