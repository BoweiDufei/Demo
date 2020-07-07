import 'package:shared_preferences/shared_preferences.dart';

/**c语言风格 存储字符串到本地*/
Future<void> local_setStringWithKeyValue(String key, String value) async{
    SharedPreferences sp = await SharedPreferences.getInstance();
    sp.setString(key,value);
}

/**从本地获取字符串 */
Future<String> local_getStringFromKey(key) async{
    SharedPreferences sp = await SharedPreferences.getInstance();
    return sp.getString(key);
}

/**从本地移除某key对应的value */
Future<String> local_removeFromKey(key) async{
    SharedPreferences sp = await SharedPreferences.getInstance();
    sp.remove(key);
}