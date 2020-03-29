import 'package:dio/dio.dart';
import 'dart:async';
import 'dart:io';
import '../config/index.dart';

Future getRequest(url,{formData}) async{
  try {
    Response response;
    Dio dio = new Dio();
    dio.options.contentType = ContentType.parse('application/x-www-form-urlencoded');
    if(formData==null){
      response = await dio.get(url);
    }else{
      response = await dio.get(url,queryParameters:formData);
    }
    if(response.statusCode == 200){
      return response;
    }else{
      throw Exception('后端接口异常，请检查测试代码');
    }
  } catch (e) {
    return print('error::::${e}');
  }
}

