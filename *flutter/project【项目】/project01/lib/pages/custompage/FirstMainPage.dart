import 'package:demo02/packages/ScreenAdaper.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../../packages/DioManager.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';

class FirstMainPage extends StatefulWidget {
  @override
  _FirstMainPageState createState() => _FirstMainPageState();
}

class _FirstMainPageState extends State<FirstMainPage> {
  List dataArray = [];
  RefreshController _refreshController =
      RefreshController(initialRefresh: false);

  @override
  void initState() {
    super.initState();
    getFirstDataFromNet(null, null);
  }

  /**第一次进入发送请求 */
  void getFirstDataFromNet(void Function(List) finishBlock, Function errorBlock) {
    Map<String, dynamic> params = Map();
    DioManager.getInstance().get('/api/getSumarArticles', params, (data) {
      if (finishBlock != null) {
        finishBlock(data['data']);
      }
    }, (error) {
      if (errorBlock != null) {
        errorBlock();
      }
    });
  }

  void _onRefresh() async {
    print('刷新了');
    getFirstDataFromNet((list) {
      setState(() {
        dataArray = [];
        dataArray.addAll(list);
      });
      _refreshController.refreshCompleted();
    }, () {
      _refreshController.refreshCompleted();
    });
  }

  void _onLoading() async {
    print('又刷新了');
    getFirstDataFromNet((list) {
      setState(() {
        dataArray.addAll(list);
      });
      _refreshController.loadComplete();
    }, () {
      _refreshController.loadComplete();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('首页'),
        elevation: 0.0,
      ),
      body: SmartRefresher(
        header: WaterDropHeader(),
        enablePullDown: true,
        enablePullUp: true,
        controller: _refreshController,
        onRefresh: _onRefresh,
        onLoading: _onLoading,
        footer: CustomFooter(
          builder: (BuildContext context, LoadStatus mode) {
            Widget body;
            if (mode == LoadStatus.idle) {
              body = Text("上拉加载");
            } else if (mode == LoadStatus.loading) {
              body = CupertinoActivityIndicator();
            } else if (mode == LoadStatus.failed) {
              body = Text("加载失败！点击重试！");
            } else if (mode == LoadStatus.canLoading) {
              body = Text("松手,加载更多!");
            } else {
              body = Text("没有更多数据了!");
            }
            return Container(
              height: 55.0,
              child: Center(child: body),
            );
          },
        ),
        child: ListView.builder(
          itemCount: dataArray.length,
          itemBuilder: (context, index) {
            Map info = dataArray[index];
            String imgSrc = info["imgSrc"];
            String imgUrl = imgSrc.replaceAll(
                'http://127.0.0.1:8899/app', 'http://120.53.248.129:7001');
            print('info = ${info}');
            return Card(
              child: Container(
                height: setHeight(100),
                color: Colors.red,
                child: InkWell(
                  onTap: (){
                    Navigator.pushNamed(context, '/webpage',arguments: {"id":info["_id"]});
                  },
                  child: Row(
                    children: <Widget>[
                      Container(
                        width: setWidth(50),
                        height: setHeight(50),
                        color: Colors.blue,
                        child: Image.network(
                          imgUrl,
                          fit: BoxFit.cover,
                        ),
                      )
                    ],
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
