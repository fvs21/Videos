import { useUser } from "@/store";
import { Stack } from "expo-router";

export default function RouteProviders() {
    const [user] = useUser();

    if(!user) {
        return (
            <Stack 
                screenOptions={{
                    headerShown: false,
                }}
            />
        )
    }

    return (
        <Stack>
            <Stack.Screen name="index" />
        </Stack>
    )
}