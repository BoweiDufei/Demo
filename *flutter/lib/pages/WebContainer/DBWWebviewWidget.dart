import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_webview_plugin/flutter_webview_plugin.dart';

class DBWWebviewWidget extends StatefulWidget {
  final String url; //web路径
  final String statusBarColor; //色调
  final String title; //标题
  final bool hideAppBar; //是否隐藏bar
  final bool backForbid; //返回禁止

  const DBWWebviewWidget(
      {Key key,
      this.url,
      this.statusBarColor,
      this.title,
      this.hideAppBar,
      this.backForbid})
      : super(key: key);

  @override
  _DBWWebviewWidgetState createState() => _DBWWebviewWidgetState();
}

class _DBWWebviewWidgetState extends State<DBWWebviewWidget> {
  final webviewReference = new FlutterWebviewPlugin();
  StreamSubscription<String> _onUrlChanged;
  StreamSubscription<WebViewStateChanged> _onStateChanged;
  StreamSubscription<WebViewHttpError> _onHttpError;
  @override
  void initState() {
    super.initState();
    //防止重复调用，先关闭一下
    webviewReference.close();
    _onUrlChanged = webviewReference.onUrlChanged.listen((String url) {
      //url变化会进入此方法
    });
    _onStateChanged =
        webviewReference.onStateChanged.listen((WebViewStateChanged state) {
      //页面变化会进入此方法
      print('webview状态发生变化：${state}');
      switch (state.type) {
        case WebViewState.shouldStart:
          {}
          break;
        case WebViewState.startLoad:
          {}
          break;
        case WebViewState.finishLoad:
          {}
          break;
        case WebViewState.abortLoad:
          {}
          break;
        default:
      }
    });
    _onHttpError =
        webviewReference.onHttpError.listen((WebViewHttpError error) {
      print(error);
    });
  }

  @override
  void dispose() {
    super.dispose();
    _onUrlChanged.cancel();
    _onStateChanged.cancel();
    _onHttpError.cancel();
    webviewReference.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: Column(
          children: <Widget>[
            _appBar(Colors.white, Colors.blue),
            Expanded(
              child: WebviewScaffold(
                url: widget.url,
                withZoom: true, //手势捏合
                withLocalStorage: true, //缓存
                hidden: true,
                initialChild: Container(
                  color: Colors.white,
                  child: Center(
                    child: Text('Waiting...'),
                  ),
                ),
              ),
            )
          ],
        ),
      )
    );
  }

  Widget _appBar(Color backgroundColor, Color backButtonColor) {
    if (widget.hideAppBar ?? false) {
      return Container(
        color: backgroundColor,
        height: 30,
      );
    } else {
      return Container(
        height: 64,
        decoration: BoxDecoration(
          color: Colors.white
        ),
        child: FractionallySizedBox(
            widthFactor: 1,
            child: Container(
              decoration: BoxDecoration(color: Colors.red),
              child: Padding(
                padding: EdgeInsets.fromLTRB(0, 25, 0, 0),
                child: Stack(
                  children: <Widget>[
                    GestureDetector(
                      child: Container(
                        margin: EdgeInsets.only(left: 10),
                        child: GestureDetector(
                          child: Icon(
                            Icons.close,
                            color: backgroundColor,
                            size: 26,
                          ),
                          onTap: (){
                            Navigator.pop(context);
                          },
                        ),
                      ),
                    ),
                    Positioned(
                      left: 0,
                      right: 0,
                      child: Center(
                        child: Text(
                          '${widget.title ?? '暂无'}',
                          style:
                              TextStyle(color: backButtonColor, fontSize: 20),
                        ),
                      ),
                    )
                  ],
                ),
              ),
            )),
      );
    }
  }
}
