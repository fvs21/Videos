import { User } from "@/types/globals";
import { useQueryClient } from "@tanstack/react-query";

export const useUser = (): [User, (user: User) => void] => {
    const queryClient = useQueryClient();
        
    function setUser(user: User) {
        queryClient.setQueryData(['user'], user);
    }

    /**
    return [
        {
            username: "fabriziovanzani",
            email: "fabriziovanzani@gmail.com",
            full_name: "Fabrizio Vanzani",
            countryCode: "IT",
            phone: "1234567890",
            date_of_birth: "1990-01-01",
            pfp_url: "https://picsum.photos/200/300",
            has_email_verified: true,
            has_phone_verified: false,
            is_seller: true,
        },
        setUser
    ]
    */

    setUser({
        ...queryClient.getQueryData(['user']) as User,
        is_seller: true,
    });
    
    return [
        queryClient.getQueryData(['user']) as User,
        setUser
    ];
}