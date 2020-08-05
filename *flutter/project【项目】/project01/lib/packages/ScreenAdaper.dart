import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ScreenAdaper {
  /**初始化 */
  static init(BuildContext context){
    double width = 750.0;
    double height = 1334.0;
    // allowFontScaling：是否会跟随系统文字进行缩放，设置为false，不跟随系统文字
    ScreenUtil.init(context,width: width*0.5, height: height*0.5, allowFontScaling: false);
  }
}

/**c语言风格设置宽度 */
double setWidth(double value){
  return ScreenUtil().setWidth(value);
}
/**c语言风格设置高度 */
double setHeight(double value){
  return ScreenUtil().setHeight(value);
}
/**设置字体 */
double setFontSize(double value){
  return ScreenUtil().setSp(value);
}

/**获取屏幕总宽度 */
double keyMainScreenWidth(){
  return ScreenUtil.screenWidth;
}
/**获取屏幕总高度 */
double keyMainScreenHeight(){
  return ScreenUtil.screenHeight;
}

/**获取状态栏总高度 */
double getTopStateBarHeight(){
    return ScreenUtil.statusBarHeight;
}
/**获取底部导航总高度 */
double getBottomBarHeight(){
    return ScreenUtil.bottomBarHeight;
}