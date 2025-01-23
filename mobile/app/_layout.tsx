import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useFonts } from "expo-font";
import { Provider } from "jotai";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthenticationProvider from '@/providers/AuthenticationProvider';
import RouteProviders from '@/providers/RouteProviders';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("@/assets/fonts/Rubik-Bold.ttf"),
    "Rubik-Regular": require("@/assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("@/assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Light": require("@/assets/fonts/Rubik-Light.ttf"),
    "Rubik-ExtraBold": require("@/assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-SemiBold": require("@/assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    if(fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const [queryClient, setQueryClient] = useState(() => new QueryClient());

  if(!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <AuthenticationProvider>
          <RouteProviders />
        </AuthenticationProvider>
      </Provider>
    </QueryClientProvider>
  )
}