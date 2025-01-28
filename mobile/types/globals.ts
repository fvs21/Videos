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
    pfp_url: string;
    has_email_verified: boolean;
    has_phone_verified: boolean;
}