import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export default function AuthenticationProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuthToken = async () => {
            try {
                const token = await SecureStore.getItemAsync('user_r');
                
                if (token) {
                    // TODO: Implement user information retrieval logic here
                    // Example:
                    // await fetchUserInfo(token);
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthToken();
    }, []);

    if (isLoading) {
        // You might want to show a loading spinner here
        return null;
    }

    return children;
}