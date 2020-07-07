import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class WebViewPage extends StatefulWidget {

	final Map arguments;
	WebViewPage({this.arguments});

  @override
  _WebViewPageState createState() => _WebViewPageState();
}

class _WebViewPageState extends State<WebViewPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('123123'),
      ),
      body: Container(
        color: Colors.deepPurple,
        child: RaisedButton(onPressed: (){
          print(widget.arguments);
        }),
      ),
    );
  }
}