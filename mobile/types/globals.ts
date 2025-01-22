export type SVGProps = {
    width: number;
    color?: string;
}

export type User = {
    username: string;
    email: string;
    date_of_birth: string;
    full_name: string;
    phone: string;
    countryCode: string;
    profile_picture_url: string;
    is_email_verified: boolean;
    is_phone_verified: boolean;
}