import { apiGuest } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { RegistrationData } from '../types';

export function useRegister() {
    const { mutateAsync: register, isPending, isError } = useMutation({
        mutationFn: async (body: RegistrationData) => {
            const request = await apiGuest.post('/register', body);
            return request.data;
        }
    });

    return {
        register, 
        isPending,
        registerDisabled: isPending && !isError
    }
}