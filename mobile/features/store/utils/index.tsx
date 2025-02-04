import { PermissionsAndroid, Platform } from "react-native";
import CreateStoreOne from "../components/CreateStore/CreateStoreOne";
import CreateStoreTwo from "../components/CreateStore/CreateStoreTwo";

export function determineCreateStoreStep(step: number) {
    switch(step) {
        case 0:
            return <CreateStoreOne />
        case 1:
            return <CreateStoreTwo />
    }
}

export function checkValidImageType(file: File): boolean {
    return file.type in ["image/jpeg", "image/png", "image/jpg"];
}

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