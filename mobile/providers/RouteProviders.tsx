import { useFetchUser } from "@/api/hooks/auth";
import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "@/app/(root)";
import VerifyEmail from "@/app/(root)/(auth)/(verify-email)/verify-email";
import More from "@/app/(root)/(more)/more";
import Register from "@/app/(root)/(auth)/register/[step]";
import GoBackButton from "@/components/GoBackButton";
import { ThemedText } from "@/components/ThemedText";
import TabsLayout from "@/app/(root)/(tabs)/_layout";

const Stack = createNativeStackNavigator();

export default function RouteProviders() {
    const { user, isLoading } = useFetchUser();

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

    if(!user?.is_email_verified) {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="verify-email" component={VerifyEmail} />
                <Stack.Screen 
                    name="more" 
                    component={More} 
                    options={{
                        headerShown: true,
                        headerLeft: () => <GoBackButton />,
                        headerTitle: () => (
                            <ThemedText weight='300' type='defaultSemiBold' style={{fontSize: 18}}>
                                More
                            </ThemedText>
                        )
                    }}
                />
            </Stack.Navigator>
        )
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Explore" component={TabsLayout} />
        </Stack.Navigator>
    )
}