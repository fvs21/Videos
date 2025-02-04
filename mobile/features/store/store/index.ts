import { atom, useAtom } from "jotai";

export const storeNameAtom = atom<string>("");
export const storeImageAtom = atom<File | null>(null);

export const useCreateStoreName = () => {
    return useAtom(storeNameAtom);
}

export const useCreateStoreImage = () => {
    return useAtom(storeImageAtom);
}