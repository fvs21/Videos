import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, apiGuest } from ".";

export const useRefreshToken = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: refreshToken, isPending } = useMutation({
        mutationFn: async () => {
            const res = await apiGuest.get("/auth/refresh", {
                withCredentials: true,
            });

            return res.data.access_token;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["access_token"], data);
        }
    });

    return {
        refreshToken,
        isPending
    }
}

export const useAuth = () => {
    const queryClient = useQueryClient();

    const token = queryClient.getQueryData(["access_token"]) || "";

    function setAccessToken(newToken: string | null) {
        queryClient.setQueryData(["access_token"], newToken);
    }

    return [token, setAccessToken] as const;
}

export const useUser = () => {
    const { data: user, isLoading, isError } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await api.get("/auth/session", {
                withCredentials: true,
            });

            return res.data;
        }
    });

    return {
        user,
        isLoading,
        isError
    }
}
