import { apiGuest } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRegister = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: register, isPending } = useMutation({
        mutationFn: async ({ username, email, password }: { username: string; email: string; password: string }) => {
            const response = await apiGuest.post('/auth/register', { username, email, password });
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data.user);
            queryClient.setQueryData(['access_token'], data.access_token);
        }
    });

    return {
        register,
        isPending
    }
}