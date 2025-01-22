import { apiGuest } from '@/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RegistrationData, RegistrationResponse } from '../types';
import * as SecureStore from 'expo-secure-store';

export function useCheckUsernameAvailability() {
    const { mutateAsync: checkUsernameAvailability, isPending } = useMutation({
        mutationFn: async (username: string) => {
            const request = await apiGuest.get(`/auth/username_available?username=${username}`);
            return request.data;
        }
    });

    return {
        checkUsernameAvailability,
        isPending
    }
}

export function useRegister() {
    const queryClient = useQueryClient();

    const { mutateAsync: register, isPending, isError } = useMutation({
        mutationFn: async (body: RegistrationData) => {
            const request = await apiGuest.post('/auth/register', body);
            return request.data;
        },
        onSuccess: async (data: RegistrationResponse) => {
            await SecureStore.setItemAsync('user_r', data.refresh_token);
            queryClient.setQueryData(['access_token'], data.access_token);
            queryClient.setQueryData(['user'], data.user);
        }
    });

    return {
        register, 
        isPending,
        registerDisabled: isPending && !isError
    }
}