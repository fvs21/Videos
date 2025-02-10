import { useFetchUser } from "@/api/hooks/auth";
import { useColorScheme, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "@/app/(root)";
import VerifyEmail from "@/app/(root)/(auth)/(verify-email)/verify-email";
import More from "@/app/(root)/(more)/more";
import Register from "@/app/(root)/(auth)/register/register";
import GoBackButton from "@/components/GoBackButton";
import { ThemedText } from "@/components/ThemedText";
import TabsLayout from "@/app/(root)/(tabs)/_layout";
import Configuration from "@/app/(root)/(configuration)/configuration";
import { Colors } from "@/styles/variables";
import EditProfile from "@/app/(root)/(tabs)/(profile)/(edit)/edit";
import CreateStore from "@/app/(root)/(store)/(create)/create";
import ViewStore from "@/app/(root)/(store)/(view)/view";
import Setup from "@/app/(root)/(store)/setup/[step]";
import CreateProduct from "@/features/store/components/CreateProduct";
import GoBackButtonX from "@/components/GoBackButtonX";
import ViewProduct from "@/app/(root)/(store)/product/view";

const Stack = createNativeStackNavigator();

export default function RouteProviders() {
    const { user, isLoading } = useFetchUser();
    const theme = useColorScheme() ?? 'light';
    const isDark = theme === 'dark';

    if(isLoading) {
        return <View></View>
    }

    if(!user) {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Index" component={Index} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
        )
    }

    if(!user?.has_email_verified) {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="verify-email" component={VerifyEmail} />
                <Stack.Screen 
                    name="more" 
                    component={More} 
                    options={{
                        ...(defaultHeaderConfig('More')),
                        headerStyle: {
                            backgroundColor: isDark ? Colors.dark.background : Colors.light.background
                        },
                    }}
                />
            </Stack.Navigator>
        )
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Explore" component={TabsLayout} />
            <Stack.Screen 
                name="Configuration" 
                component={Configuration}
                options={{
                    ...(defaultHeaderConfig('Settings')),
                    headerStyle: {
                        backgroundColor: isDark ? Colors.dark.background : Colors.light.background
                    },
                }} 
            />
            <Stack.Screen 
                name="EditProfile" 
                component={EditProfile} 
                options={{
                    ...(defaultHeaderConfig('Edit Profile')),
                    headerStyle: {
                        backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
                    },
                }}
            />
            <Stack.Screen 
                name="CreateStore" 
                component={CreateStore} 
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SetupStore"
                component={Setup}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ViewStore"
                component={ViewStore}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="CreateProduct"
                component={CreateProduct}
                options={{
                    presentation: 'fullScreenModal',  
                    headerStyle: {
                        backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
                    },
                    headerShown: true,
                    headerLeft: () => <GoBackButtonX />,
                    headerTitle: () => (
                        <ThemedText weight='300' type='defaultSemiBold' style={{fontSize: 16}}>
                            Create Product
                        </ThemedText>
                    ),
                    headerShadowVisible: false,
                }}
            />
            <Stack.Screen
                name="ViewProduct"
                component={ViewProduct}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

function defaultHeaderConfig(pageName: string) {
    return {
        headerShown: true,
        headerLeft: () => <GoBackButton />,
        headerTitle: () => (
            <ThemedText weight='300' type='defaultSemiBold' style={{fontSize: 16}}>
                {pageName}
            </ThemedText>
        ),
    }
}