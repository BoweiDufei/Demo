import 'dart:convert';

import 'package:demo02/packages/ScreenAdaper.dart';
import 'package:demo02/packages/Storage.dart';
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
  void initState() async{
    super.initState();

    // 先从本地获取字符串
    String localStr = await local_getStringFromKey("localList");
    if (localStr != null && localStr.length > 0) {
      List localList = jsonDecode(localStr);
      dataArray = [];
      dataArray.addAll(localList);
    }else{
      // 本地获取不到就从服务器抓取
      getFirstDataFromNet((list) {
        setState(() {
          dataArray = [];
          dataArray.addAll(list);
        });
      }, null);
    }
  }

  /**第一次进入发送请求 */
  void getFirstDataFromNet(
      void Function(List) finishBlock, Function errorBlock)  async{
    Map<String, dynamic> params = Map();
    DioManager.getInstance().get('/api/getSumarArticles', params, (data) {
      var listData = data['data'];
      if (finishBlock != null) {
        finishBlock(listData);
        // 要存储本地
        local_setStringWithKeyValue("localList", jsonEncode(listData));
      }
    }, (error) {
      if (errorBlock != null) {
        errorBlock();
      }
    });
  }

  void _onRefresh() async {
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
            String titleStr = info["titleStr"];
            return Card(
              child: AspectRatio(
                aspectRatio: 529 / 252,
                child: InkWell(
                  onTap: () {
                    Navigator.pushNamed(context, '/webpage',
                        arguments: {"id": info["_id"]});
                  },
                  // 539  252
                  child: Stack(
                    children: <Widget>[
                      Positioned(
                        left: 0,
                        top: 0,
                        bottom: 0,
                        right: 0,
                        child: Image.network(
                          imgUrl,
                          fit: BoxFit.cover,
                        ),
                      ),
                      Positioned(
                        bottom: 0,
                        left: 0,
                        right: 0,
                        child: Container(
                          height: setHeight(60),
                          color: Color.fromRGBO(0, 0, 0, 0.25),
                          padding: EdgeInsets.fromLTRB(setWidth(10), 0, setWidth(10), 0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: <Widget>[
                              Container(
                                child: Text(
                                  titleStr,
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                  textAlign: TextAlign.left,
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: setFontSize(16),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
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
