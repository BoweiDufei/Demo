import 'package:flutter/material.dart';

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
      ),
    );
  }
}
