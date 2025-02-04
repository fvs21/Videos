import { PermissionsAndroid, Platform } from "react-native";

export async function hasAndroidPhotosPermission() {
    const getCheckPermissionPromise = () => {
        if (Platform.Version as number >= 33) {
            return Promise.all([
                PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
            ]).then(
                ([hasReadMediaImagesPermission]) => {
                    hasReadMediaImagesPermission
                }
            );
        } else {
            return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
        return true;
    }

    const getRequestPermissionPromise = () => {
        if(Platform.Version as number >= 33) {
            return PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            ).then(
                (statuses: any) => (
                    statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] === PermissionsAndroid.RESULTS.GRANTED
                )       
            )
        } else{
            return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        }
    };

    return await getRequestPermissionPromise();
}