import { User } from "@/types/globals";

export type RegistrationProps = {
    setStep: (step: number) => void;
}

export type RegistrationData = {
    date_of_birth: string;
    username: string;
    email: string;
    password: string;
}

export type RegistrationResponse = {
    user: User;
    access_token: string;
    refresh_token: string;
}