import 'package:image_picker/image_picker.dart';

/**选择相册图片 
 * 外部使用 Image.file(File(this.pickedFile.path))
*/
Future<PickedFile> selectImageFromGallery({double maxWidth, double maxHeight, int imageQuality}) async {
  try {
    PickedFile pickedFile =
        await ImagePicker().getImage(source: ImageSource.gallery,maxWidth:maxWidth,maxHeight:maxHeight,imageQuality:imageQuality);
    return pickedFile;
  } catch (e) {
    print(e);
    return null;
  }
}
/**摄像头图片
 * 外部使用 Image.file(File(this.pickedFile.path))
*/
Future<PickedFile> selectImageFromCamera({double maxWidth, double maxHeight, int imageQuality}) async {
  try {
    PickedFile pickedFile =
        await ImagePicker().getImage(source: ImageSource.camera,maxWidth:maxWidth,maxHeight:maxHeight,imageQuality:imageQuality);
    return pickedFile;
  } catch (e) {
    print(e);
    return null;
  }
}
