import { api, apiMultiPart } from "@/api";
import { useAuth, useRefreshToken } from "@/api/auth";
import { useEffect, useLayoutEffect } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const { refreshToken } = useRefreshToken();

    useEffect(() => {
        const refresh = async () => {
            try {
                await refreshToken();
            } catch (error) {
                console.error("Failed to refresh token:", error);
            }
        }   
        refresh();
    }, []);

    const [token, setToken] = useAuth();

    useLayoutEffect(() => {
        const interceptor = api.interceptors.request.use(
            (config) => {
                config.headers.Authorization = !(config as any)._retry && token ? `Bearer ${token}` : config.headers.Authorization;
                return config;
            }
        )

        const interceptor2 = apiMultiPart.interceptors.request.use(
            (config) => {
                config.headers.Authorization = !(config as any)._retry && token ? `Bearer ${token}` : config.headers.Authorization;
                return config;
            }
        )

        return () => {
            api.interceptors.request.eject(interceptor);
            apiMultiPart.interceptors.request.eject(interceptor2);
        }
    }, [token]);

    useLayoutEffect(() => {
        const interceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                                
                if (error.response.status === 401 && error.response.data.code === 'token_not_valid') {
                    try {
                        const res = await refreshToken();

                        setToken(res.access_token as string);
                        originalRequest.headers.Authorization = `Bearer ${res.access_token}`;
                        originalRequest._retry = true;

                        return api(originalRequest);
                    } catch(error) {
                        setToken(null);
                    }
                }
                return Promise.reject(error);
            }
        );

        const interceptor2 = apiMultiPart.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && error.response.data.message === 'Unauthorized') {
                    try {
                        const res = await refreshToken();

                        setToken(res.access_token as string);
                        originalRequest.headers.Authorization = `Bearer ${res.access_token}`;
                        originalRequest._retry = true;

                        return apiMultiPart(originalRequest);
                    } catch(error) {
                        setToken(null);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.response.eject(interceptor);
            apiMultiPart.interceptors.response.eject(interceptor2);
        }
    }, []);

    return children;
}