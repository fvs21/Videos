import { apiGuest } from '@/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RegistrationData, RegistrationResponse, VerifyEmailData } from '../types';
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

export function useVerifyEmail() {
    const { mutateAsync: verifyEmail, isPending, isError } = useMutation({
        mutationFn: async (body: number) => {
            const request = await apiGuest.post('/auth/verify-email', body);
            return request.data;
        }
    });

    return {
        verifyEmail,
        isPending,
        verifyEmailDisabled: isPending && !isError
    }
}

export function useResendEmailVerification() {
    const { mutateAsync: resendEmailVerification, isPending, isError } = useMutation({
        mutationFn: async () => {
            const request = await apiGuest.post('/auth/email/code');
            return request.data;
        }
    });

    return {
        resendEmailVerification,
        isPending,
        resendEmailVerificationDisabled: isPending && !isError
    }
}