import 'package:flutter/material.dart';
import './widget05.dart';
//横排流水布局

class DemoFourWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('标题'),
      ),
      body: ListView.builder(
        itemCount: 4,
        itemBuilder: (context, index) {
          return createListElementWidget(context, index);
        },
      ),
    );
  }

  Widget createListElementWidget(BuildContext context, int index) {
    switch (index) {
      case 0:
        {
          return Container(
            color: Colors.blue,
            height: 140,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: getWidetsMethod(),
            ),
          );
        }
        break;
      case 1:
        {
          return Container(
            height: 200,
            child: Padding(
              child: GridView.builder(
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 4,
                    mainAxisSpacing: 8,
                    crossAxisSpacing: 5,
                    childAspectRatio: 1),
                itemBuilder: (context, index) {
                  return Container(
                    child: Stack(
                      children: <Widget>[
                        Image.network(
                            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=903363594,2320286165&fm=15&gp=0.jpg'),
                        Positioned(
                          child: Container(
                            child: RaisedButton(
                              child: Text(
                                '花',
                                style:
                                    TextStyle(fontSize: 50, color: Colors.red),
                              ),
                              onPressed: () {
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (BuildContext context) {
                                          return DemoFiveWidget();
                                        }));
                              },
                            ),
                            alignment: Alignment.center,
                          ),
                          left: 0,
                          top: 0,
                          right: 0,
                          bottom: 0,
                        ),
                      ],
                    ),
                    color: Colors.red,
                    width: 50,
                    height: 50,
                  );
                },
                itemCount: 8,
                physics: NeverScrollableScrollPhysics(),
              ),
              padding: EdgeInsets.all(5),
            ),
          );
        }
        break;
      case 2:
        {}
        break;
      case 3:
        {}
        break;
      default:
    }
    return Container(
      child: Text('测试'),
    );
  }

  List<Widget> getWidetsMethod() {
    int totalNum = 4;
    List<Widget> list = [];
    for (var i = 0; i < totalNum; i++) {
      Container c = Container(
        decoration: BoxDecoration(
          color: Colors.yellowAccent,
        ),
        child: Padding(
          padding: EdgeInsets.only(top: 10),
          child: Text(
            '${i}号',
            style: TextStyle(fontSize: 28),
          ),
        ),
        width: 60,
        height: 100,
        alignment: Alignment.topCenter,
      );
      list.add(c);
    }
    return list;
  }
}
