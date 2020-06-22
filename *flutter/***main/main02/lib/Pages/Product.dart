import 'package:flutter/material.dart';

class Product extends StatefulWidget {
  @override
  _ProductState createState() => _ProductState();
}

class _ProductState extends State<Product> with SingleTickerProviderStateMixin {
  TabController _tab;

  @override
  void initState() {
    super.initState();
    _tab = new TabController(length: 2, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('产品'),
        bottom: TabBar(
          tabs: <Widget>[
            Tab(
              text: '01',
            ),
            Tab(
              text: '02',
            )
          ],
          controller: _tab,
        ),
      ),
      body: TabBarView(
        controller: _tab,
        children: <Widget>[
          ListView.builder(
            itemCount: 10,
            itemBuilder: (BuildContext context, int index) {
              return Card(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    Card(
                      child: GestureDetector(
                        onTap: (){
                          print('onTap');
                          Navigator.pushNamed(context, '/productInfo',arguments: {"id":'我是上个界面传过来的id'});
                          
                        },
                        child: Column(
                          children: <Widget>[
                            Row(
                              children: <Widget>[
                                Expanded(
                                  child: AspectRatio(
                                      child: Image.network(
                                          'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'),
                                      aspectRatio: 2),
                                )
                              ],
                            ),
                          ],
                        ),
                      ),
                    )
                  ],
                ),
              );
            },
          ),
          ListView.builder(
            itemCount: 10,
            itemBuilder: (BuildContext context, int index) {
              return Container(
                child: Text('ListView02'),
              );
            },
          ),
        ],
      ),
    );
  }
}
