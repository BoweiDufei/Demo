import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

class WebViewPage extends StatefulWidget {
  final Map arguments;
  WebViewPage({this.arguments});

  @override
  _WebViewPageState createState() => _WebViewPageState();
}

class _WebViewPageState extends State<WebViewPage> {
  InAppWebViewController webView;
  String url = "";
  double progress = 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('123123'),
      ),
      body: Container(
        color: Colors.deepPurple,
        child: InAppWebView(
          initialUrl: "http://120.53.248.129:7001/public/dist/index.html#/article/${widget.arguments["id"]}",
          initialHeaders: {},
          initialOptions: InAppWebViewGroupOptions(
              crossPlatform: InAppWebViewOptions(
            debuggingEnabled: true,
          )),
          onWebViewCreated: (InAppWebViewController controller) {
            webView = controller;
          },
          onLoadStart: (InAppWebViewController controller, String url) {
            setState(() {
              this.url = url;
            });
          },
          onLoadStop: (InAppWebViewController controller, String url) async {
            setState(() {
              this.url = url;
            });
          },
          onProgressChanged: (InAppWebViewController controller, int progress) {
            setState(() {
              this.progress = progress / 100;
            });
          },
        ),
      ),
    );
  }
}
