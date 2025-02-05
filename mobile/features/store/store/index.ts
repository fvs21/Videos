import { ImagePickerAsset } from "expo-image-picker";
import { atom, useAtom } from "jotai";

export const storeNameAtom = atom<string>("");
export const storeImageAtom = atom<ImagePickerAsset | null>(null);

export const useCreateStoreName = () => {
    return useAtom(storeNameAtom);
}

export const useCreateStoreImage = () => {
    return useAtom(storeImageAtom);
}