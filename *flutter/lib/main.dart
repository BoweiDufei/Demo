import 'package:flutter/material.dart';
import './config/index.dart';
import './provide/current_index_provide.dart';
import 'package:provide/provide.dart';
import './pages/index_page.dart';

/**
  flutter_swiper: ^1.1.6
  flutter_screenutil: ^0.5.2
  common_utils: ^1.1.1 
  dio: ^2.1.2
  url_launcher: ^5.0.1
  flutter_easyrefresh: ^1.2.7
  provide: ^1.0.2
  fluttertoast: ^3.0.1
  fluro: ^1.4.0
  flutter_html: ^0.9.6
  sqflite: ^1.1.0
  shared_preferences: ^0.5.1
 */

void main(){
  var currentIndexProvide = CurrentIndexProvide();
  var providers = Providers();
  providers
    ..provide(Provider<CurrentIndexProvide>.value(currentIndexProvide));
  runApp(ProviderNode(child: MyApp(),providers: providers,));
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: KString.mainTitle,//flutter女装商城
      debugShowCheckedModeBanner: false,
      //主题
      theme: ThemeData(
        primarySwatch: KColor.primaryColor,
      ),
      home: IndexPage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title2}) : super(key: key);
  final String title2;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title2),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.display1,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
