import { useEffect, useLayoutEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useAuth, useRefreshToken } from '@/api/hooks/auth';
import { api, apiMultipart } from '@/api';
import { View } from 'react-native';

export default function AuthenticationProvider({ children }: { children: React.ReactNode }) {
    const { refreshToken, isPending } = useRefreshToken();

    useEffect(() => {
        const checkAuthToken = async () => {
            try {
                const token = await SecureStore.getItemAsync('user_r');
                
                if(token) {
                    await refreshToken(token);
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
            }
        };

        checkAuthToken();
    }, []);

    const [token, setToken] = useAuth();

    useLayoutEffect(() => {
        const interceptor = api.interceptors.request.use(
            (config) => {
                config.headers.Authorization = !(config as any)._retry && token ? `Bearer ${token}` : config.headers.Authorization;
                return config;
            }
        )

        const interceptor2 = apiMultipart.interceptors.request.use(
            (config) => {
                config.headers.Authorization = !(config as any)._retry && token ? `Bearer ${token}` : config.headers.Authorization;
                return config;
            }
        )

        return () => {
            api.interceptors.request.eject(interceptor);
            apiMultipart.interceptors.request.eject(interceptor2);
        }
    }, [token]);

    useLayoutEffect(() => {
        const interceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                console.log(error.response);
                                
                if (error.response.status === 401 && error.response.data.code === 'token_not_valid') {
                    try {
                        const refresh_token = await SecureStore.getItemAsync('user_r');

                        if(!refresh_token) {
                            setToken(null);
                            originalRequest['_retry'] = true;
                            return Promise.reject(error);
                        }

                        const response = await refreshToken(refresh_token);
                        setToken(response.access_token);

                        originalRequest.headers.Authorization = `Bearer ${response.access_token}`;
                        originalRequest['_retry'] = true;
                        return api(originalRequest);
                    } catch(error) {
                        setToken(null);
                    }
                }
                return Promise.reject(error);
            }
        );

        const interceptor2 = apiMultipart.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && error.response.data.message === 'Unauthorized') {
                    try {
                        const refresh_token = await SecureStore.getItemAsync('user_r');

                        if(!refresh_token) {
                            setToken(null);
                            originalRequest['_retry'] = true;
                            return Promise.reject(error);
                        }

                        const response = await refreshToken(refresh_token);
                        setToken(response.access_token);

                        originalRequest.headers.Authorization = `Bearer ${response.access_token}`;
                        originalRequest['_retry'] = true;
                        return apiMultipart(originalRequest);
                    } catch(error) {
                        setToken(null);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.response.eject(interceptor);
            apiMultipart.interceptors.response.eject(interceptor2);
        }
    }, []);

    if(isPending) {
        return <View></View>;
    }

    return children;
}