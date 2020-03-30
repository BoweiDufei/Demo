import 'dart:async';
import 'package:flutter/widgets.dart';
import 'package:flutter/material.dart';
/**
 * 常用第三方组件
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
/// DateFormat.
enum DateFormat {
  DEFAULT, //yyyy-MM-dd HH:mm:ss.SSS
  NORMAL, //yyyy-MM-dd HH:mm:ss
  YEAR_MONTH_DAY_HOUR_MINUTE, //yyyy-MM-dd HH:mm
  YEAR_MONTH_DAY, //yyyy-MM-dd
  YEAR_MONTH, //yyyy-MM
  MONTH_DAY, //MM-dd
  MONTH_DAY_HOUR_MINUTE, //MM-dd HH:mm
  HOUR_MINUTE_SECOND, //HH:mm:ss
  HOUR_MINUTE, //HH:mm

  ZH_DEFAULT, //yyyy年MM月dd日 HH时mm分ss秒SSS毫秒
  ZH_NORMAL, //yyyy年MM月dd日 HH时mm分ss秒  /  timeSeparate: ":" --> yyyy年MM月dd日 HH:mm:ss
  ZH_YEAR_MONTH_DAY_HOUR_MINUTE, //yyyy年MM月dd日 HH时mm分  /  timeSeparate: ":" --> yyyy年MM月dd日 HH:mm
  ZH_YEAR_MONTH_DAY, //yyyy年MM月dd日
  ZH_YEAR_MONTH, //yyyy年MM月
  ZH_MONTH_DAY, //MM月dd日
  ZH_MONTH_DAY_HOUR_MINUTE, //MM月dd日 HH时mm分  /  timeSeparate: ":" --> MM月dd日 HH:mm
  ZH_HOUR_MINUTE_SECOND, //HH时mm分ss秒
  ZH_HOUR_MINUTE, //HH时mm分
}

/// month->days.
Map<int, int> MONTH_DAY = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};
/**时间相关封装 */
class DBWDateUtil {
  /***1，获取当前时间 */
  static DateTime getCurrentDate(){
    return DateTime.now();
  }
  /**2，根据时间字符串获取DateTime格式的时间 
   * 举个栗子 DBWDateUtil.getDateTimeWithStr("2018-08-12");
  */
  static DateTime getDateTimeWithStr(String dateStr) {
    DateTime dateTime = DateTime.tryParse(dateStr);
    return dateTime;
  }
  /**3，根据相差秒数计算时间  ：1970-01-01+（milliseconds）*/
  static DateTime getDateTimeByMs(int milliseconds, {bool isUtc = false}) {
    DateTime dateTime =
        new DateTime.fromMillisecondsSinceEpoch(milliseconds, isUtc: isUtc);
    return dateTime;
  }
  /**4，计算时间 dateStr与1970-01-01之间秒数之差
   * 比如 int time = DBWDateUtil.getDateMsByTimeStr("2018-06-07");
  */
  static int getDateMillisecondsByTimeStr(String dateStr) {
    DateTime dateTime = DateTime.tryParse(dateStr);
    return dateTime == null ? null : dateTime.millisecondsSinceEpoch;
  }
  /**5，获取当前时间与1970-01-01之间秒数之差 */
  static int getCurrentDateMillisecondsByNow(){
    DateTime nowDate = getCurrentDate();
    return nowDate.millisecondsSinceEpoch;
  }
  /**6，获取当前时间格式，默认是yyyy-MM-dd HH:mm:ss SSS （重要） */
  static String getCurrentDateFommate(){
    return getDateStrByDateTime(DateTime.now());
  }
  /**7，获取某时间格式
   * dateSeparate：日期分割线常用的比如“-”
   * timeSeparate：分钟分割线常用的比如“：”
   * 举个栗子：String time = DBWDateUtil.getSomeTimeStrFromDateStr("2018-08-12 12:23:44",format: DateFormat.YEAR_MONTH_DAY,dateSeparate:"&",timeSeparate:"%");
   */
  static String getSomeTimeStrFromDateStr(String dateStr,{
    DateFormat format = DateFormat.NORMAL,
    String dateSeparate,
    String timeSeparate,
  }){
    return getDateStrByDateTime(getDateTimeWithStr(dateStr),format:format,dateSeparate:dateSeparate,timeSeparate:timeSeparate);
  }



  static String getDateStrByDateTime(DateTime dateTime,
      {DateFormat format = DateFormat.NORMAL,
      String dateSeparate,
      String timeSeparate}) {
    if (dateTime == null) return null;
    String dateStr = dateTime.toString();
    if (isZHFormat(format)) {
      dateStr = formatZHDateTime(dateStr, format, timeSeparate);
    } else {
      dateStr = formatDateTime(dateStr, format, dateSeparate, timeSeparate);
    }
    return dateStr;
  }


  
  static bool isZHFormat(DateFormat format) {
    return format == DateFormat.ZH_DEFAULT ||
        format == DateFormat.ZH_NORMAL ||
        format == DateFormat.ZH_YEAR_MONTH_DAY_HOUR_MINUTE ||
        format == DateFormat.ZH_YEAR_MONTH_DAY ||
        format == DateFormat.ZH_YEAR_MONTH ||
        format == DateFormat.ZH_MONTH_DAY ||
        format == DateFormat.ZH_MONTH_DAY_HOUR_MINUTE ||
        format == DateFormat.ZH_HOUR_MINUTE_SECOND ||
        format == DateFormat.ZH_HOUR_MINUTE;
  }

  static String formatZHDateTime(
      String time, DateFormat format, String timeSeparate) {
    time = convertToZHDateTimeString(time, timeSeparate);
    switch (format) {
      case DateFormat.ZH_NORMAL: //yyyy年MM月dd日 HH时mm分ss秒
        time = time.substring(
            0,
            "yyyy年MM月dd日 HH时mm分ss秒".length -
                (timeSeparate == null || timeSeparate.isEmpty ? 0 : 1));
        break;
      case DateFormat.ZH_YEAR_MONTH_DAY_HOUR_MINUTE: //yyyy年MM月dd日 HH时mm分
        time = time.substring(
            0,
            "yyyy年MM月dd日 HH时mm分".length -
                (timeSeparate == null || timeSeparate.isEmpty ? 0 : 1));
        break;
      case DateFormat.ZH_YEAR_MONTH_DAY: //yyyy年MM月dd日
        time = time.substring(0, "yyyy年MM月dd日".length);
        break;
      case DateFormat.ZH_YEAR_MONTH: //yyyy年MM月
        time = time.substring(0, "yyyy年MM月".length);
        break;
      case DateFormat.ZH_MONTH_DAY: //MM月dd日
        time = time.substring("yyyy年".length, "yyyy年MM月dd日".length);
        break;
      case DateFormat.ZH_MONTH_DAY_HOUR_MINUTE: //MM月dd日 HH时mm分
        time = time.substring(
            "yyyy年".length,
            "yyyy年MM月dd日 HH时mm分".length -
                (timeSeparate == null || timeSeparate.isEmpty ? 0 : 1));
        break;
      case DateFormat.ZH_HOUR_MINUTE_SECOND: //HH时mm分ss秒
        time = time.substring(
            "yyyy年MM月dd日 ".length,
            "yyyy年MM月dd日 HH时mm分ss秒".length -
                (timeSeparate == null || timeSeparate.isEmpty ? 0 : 1));
        break;
      case DateFormat.ZH_HOUR_MINUTE: //HH时mm分
        time = time.substring(
            "yyyy年MM月dd日 ".length,
            "yyyy年MM月dd日 HH时mm分".length -
                (timeSeparate == null || timeSeparate.isEmpty ? 0 : 1));
        break;
      default:
        break;
    }
    return time;
  }

  static String convertToZHDateTimeString(String time, String timeSeparate) {
    time = time.replaceFirst("-", "年");
    time = time.replaceFirst("-", "月");
    time = time.replaceFirst(" ", "日 ");
    if (timeSeparate == null || timeSeparate.isEmpty) {
      time = time.replaceFirst(":", "时");
      time = time.replaceFirst(":", "分");
      time = time.replaceFirst(".", "秒");
      time = time + "毫秒";
    } else {
      time = time.replaceAll(":", timeSeparate);
    }
    return time;
  }

  static String formatDateTime(String time, DateFormat format,
      String dateSeparate, String timeSeparate) {
    switch (format) {
      case DateFormat.NORMAL: //yyyy-MM-dd HH:mm:ss
        time = time.substring(0, "yyyy-MM-dd HH:mm:ss".length);
        break;
      case DateFormat.YEAR_MONTH_DAY_HOUR_MINUTE: //yyyy-MM-dd HH:mm
        time = time.substring(0, "yyyy-MM-dd HH:mm".length);
        break;
      case DateFormat.YEAR_MONTH_DAY: //yyyy-MM-dd
        time = time.substring(0, "yyyy-MM-dd".length);
        break;
      case DateFormat.YEAR_MONTH: //yyyy-MM
        time = time.substring(0, "yyyy-MM".length);
        break;
      case DateFormat.MONTH_DAY: //MM-dd
        time = time.substring("yyyy-".length, "yyyy-MM-dd".length);
        break;
      case DateFormat.MONTH_DAY_HOUR_MINUTE: //MM-dd HH:mm
        time = time.substring("yyyy-".length, "yyyy-MM-dd HH:mm".length);
        break;
      case DateFormat.HOUR_MINUTE_SECOND: //HH:mm:ss
        time =
            time.substring("yyyy-MM-dd ".length, "yyyy-MM-dd HH:mm:ss".length);
        break;
      case DateFormat.HOUR_MINUTE: //HH:mm
        time = time.substring("yyyy-MM-dd ".length, "yyyy-MM-dd HH:mm".length);
        break;
      default:
        break;
    }
    time = dateTimeSeparate(time, dateSeparate, timeSeparate);
    return time;
  }

  static String dateTimeSeparate(
      String time, String dateSeparate, String timeSeparate) {
    if (dateSeparate != null) {
      time = time.replaceAll("-", dateSeparate);
    }
    if (timeSeparate != null) {
      time = time.replaceAll(":", timeSeparate);
    }
    return time;
  }
}


/**定时器 */
//callback.(millisUntilFinished 毫秒).
typedef void OnTimerTickCallback(int millisUntilFinished);
class DBWTimerTool{
  int mInterval;/**时间间隔 */
  int mTotalTime;/**倒计时总时间 */
  DBWTimerTool({this.mInterval,this.mTotalTime});
  Timer _dbwTimer;
  bool _isActive = false;/**定时器是否启动 */
  OnTimerTickCallback _onTimerTickCallback;/**回调函数 */

  /**设置时间间隔 */
  void setTimeInterval(int timeInterval){
    if (timeInterval <= 0) timeInterval = Duration.millisecondsPerSecond;
    mInterval = timeInterval;
  }
  /**设置总倒计时间 */
  void setTotalTime(int totalTime) {
    if (totalTime <= 0) return;
    mTotalTime = totalTime;
  }
  
  /**启动定时器 */
  void startTimer(){
    /**如果定时器已经启动，直接返回 */
    if (_isActive || mInterval <= 0) return;
    _isActive = true;
    /**设置时间间隔 */
    Duration duration = Duration(microseconds: mInterval);
    _doCall(0);
    _dbwTimer = Timer.periodic(duration, (Timer timer){
      _doCall(timer.tick);
    });
  }

  /**执行回调 */
  void _doCall(int number){
    if(_onTimerTickCallback != null){
      _onTimerTickCallback(number);
    }
  }

  /**取消定时器 */
  void cancel(){
    if(_dbwTimer != null){
      _dbwTimer.cancel();
      _isActive = false;
      _dbwTimer = null;
    }
  }

  /**设置回调函数 */
  void setOnTimerTickCallback(OnTimerTickCallback callback) {
    _onTimerTickCallback = callback;
  }
}


/** 一些简单的小玩意儿 */
class DBWEasyTool{
  /**获取屏幕宽度 */
  static double getScreenWidth(BuildContext context){
    return MediaQuery.of(context).size.width;
  }
  /**获取屏幕高度 */
  static double getScreenHeight(BuildContext context){
    return MediaQuery.of(context).size.height;
  }
}


