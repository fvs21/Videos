import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api, apiGuest } from "..";
import { User } from "@/types/globals";

export const useRefreshToken = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: refreshToken, isPending, isError } = useMutation({
        mutationFn: async (refresh_token: string) => {
            const request = await apiGuest.get('/auth/mobile/refresh', {
                headers: {
                    Authorization: `Bearer ${refresh_token}`
                }
            });

            return request.data;
        },
        onSuccess: (data: { access_token: string }) => {
            queryClient.setQueryData(['access_token'], data.access_token);
        }
    });

    return {
        refreshToken,
        isPending,
        isError
    }
}

export const useAuth = (): [string, (access_token: string | null) => void] => {
    const queryClient = useQueryClient();

    function setAccessToken(access_token: string | null) {
        queryClient.setQueryData(['access_token'], access_token);
    }

    return [
        queryClient.getQueryData(['access_token']) as string,
        setAccessToken
    ]
}

export const useFetchUser = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: async (): Promise<User> => {
            const request = await api.get('/auth/session');
            return request.data;
        }
    });

    return {
        user: data,
        isLoading,
        isError
    }
}