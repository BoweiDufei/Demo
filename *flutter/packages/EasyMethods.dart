import 'package:fluttertoast/fluttertoast.dart';
import 'package:image_picker/image_picker.dart';
import 'package:url_launcher/url_launcher.dart';

/**选择相册图片 
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

/**摄像头图片
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

/**使用提示信息 */
void dbw_showLongToast(String msg) {
  Fluttertoast.showToast(
    msg: msg,
    toastLength: Toast.LENGTH_LONG,
    gravity: ToastGravity.CENTER,
  );
}
void dbw_showShortToast(String msg) {
  Fluttertoast.showToast(
    msg: msg,
    toastLength: Toast.LENGTH_SHORT,
    gravity: ToastGravity.CENTER,
  );
}

/**打开外网 */
Future<bool> dbw_launchWebURL(String url) async {
  if (await canLaunch(url)) {
    return launch(url);
  } else {
    return false;
  }
}
/**拨打电话 */
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