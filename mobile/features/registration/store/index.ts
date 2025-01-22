import { atom, useAtom } from "jotai";

const usernameAtom = atom<string>("");
const dateOfBirthAtom = atom<Date>(new Date());
const emailAtom = atom<string>("");
const passwordAtom = atom<string>("");

export const useUsernameAtom = () => {
    return useAtom(usernameAtom);
}

export const useDateOfBirthAtom = () => {
    return useAtom(dateOfBirthAtom);
}

export const useEmailAtom = () => {
    return useAtom(emailAtom);
}

export const usePasswordAtom = () => {
    return useAtom(passwordAtom);
}