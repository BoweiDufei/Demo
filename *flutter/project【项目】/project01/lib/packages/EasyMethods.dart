import 'package:date_format/date_format.dart';
import 'package:device_info/device_info.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:image_picker/image_picker.dart';
import 'package:url_launcher/url_launcher.dart';

/**选择相册图片 (image_picker)
 * 外部使用 Image.file(File(this.pickedFile.path))
*/
Future<PickedFile> dbw_selectImageFromGallery(
    {double maxWidth, double maxHeight, int imageQuality}) async {
  try {
    PickedFile pickedFile = await ImagePicker().getImage(
        source: ImageSource.gallery,
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        imageQuality: imageQuality);
    return pickedFile;
  } catch (e) {
    print(e);
    return null;
  }
}

/**摄像头图片 (image_picker)
 * 外部使用 Image.file(File(this.pickedFile.path))
*/
Future<PickedFile> dbw_selectImageFromCamera(
    {double maxWidth, double maxHeight, int imageQuality}) async {
  try {
    PickedFile pickedFile = await ImagePicker().getImage(
        source: ImageSource.camera,
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        imageQuality: imageQuality);
    return pickedFile;
  } catch (e) {
    print(e);
    return null;
  }
}

/**使用提示信息 (fluttertoast) */
void dbw_showLongToast(String msg) {
  Fluttertoast.showToast(
    msg: msg,
    toastLength: Toast.LENGTH_LONG,
    gravity: ToastGravity.CENTER,
  );
}

/**使用提示信息 (fluttertoast) */
void dbw_showShortToast(String msg) {
  Fluttertoast.showToast(
    msg: msg,
    toastLength: Toast.LENGTH_SHORT,
    gravity: ToastGravity.CENTER,
  );
}

/**打开外网 (url_launcher) */
Future<bool> dbw_launchWebURL(String url) async {
  if (await canLaunch(url)) {
    return launch(url);
  } else {
    return false;
  }
}
/**拨打电话 (url_launcher) */
Future<bool> dbw_launchMobile(String mobileStr) async {
  if(mobileStr.length == 0){
    return false;
  }
  String url = 'tel:$mobileStr';
  if (await canLaunch(url)) {
    return launch(url);
  } else {
    return false;
  }
}

/**获取安卓信息 (device_info) */
Map<String, dynamic> readAndroidBuildData(AndroidDeviceInfo build) {
    return <String, dynamic>{
      'version.securityPatch': build.version.securityPatch,
      'version.sdkInt': build.version.sdkInt,
      'version.release': build.version.release,
      'version.previewSdkInt': build.version.previewSdkInt,
      'version.incremental': build.version.incremental,
      'version.codename': build.version.codename,
      'version.baseOS': build.version.baseOS,
      'board': build.board,
      'bootloader': build.bootloader,
      'brand': build.brand,
      'device': build.device,
      'display': build.display,
      'fingerprint': build.fingerprint,
      'hardware': build.hardware,
      'host': build.host,
      'id': build.id,
      'manufacturer': build.manufacturer,
      'model': build.model,
      'product': build.product,
      'supported32BitAbis': build.supported32BitAbis,
      'supported64BitAbis': build.supported64BitAbis,
      'supportedAbis': build.supportedAbis,
      'tags': build.tags,
      'type': build.type,
      'isPhysicalDevice': build.isPhysicalDevice,
      'androidId': build.androidId,
      'systemFeatures': build.systemFeatures,
    };
  }

  /**获取ios信息 (device_info) */
  Map<String, dynamic> readIosDeviceInfo(IosDeviceInfo data) {
    return <String, dynamic>{
      'name': data.name,
      'systemName': data.systemName,
      'systemVersion': data.systemVersion,
      'model': data.model,
      'localizedModel': data.localizedModel,
      'identifierForVendor': data.identifierForVendor,
      'isPhysicalDevice': data.isPhysicalDevice,
      'utsname.sysname:': data.utsname.sysname,
      'utsname.nodename:': data.utsname.nodename,
      'utsname.release:': data.utsname.release,
      'utsname.version:': data.utsname.version,
      'utsname.machine:': data.utsname.machine,
    };
  }

  /**时间日期转换 */
  String changeTime(){
    formatDate(DateTime(1989, 2, 21), [yyyy, '-', mm, '-', dd]);
  }