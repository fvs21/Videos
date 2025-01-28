import { User } from "@/types/globals";
import { useQueryClient } from "@tanstack/react-query";

export const useUser = (): [User, (user: User) => void] => {
    const queryClient = useQueryClient();
        
    function setUser(user: User) {
        queryClient.setQueryData(['user'], user);
    }
    return [
        queryClient.getQueryData(['user']) as User,
        setUser
    ];
}