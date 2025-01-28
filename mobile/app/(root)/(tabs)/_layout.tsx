import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./(profile)/profile";
import Home from "./(home)/home";
import { Text, useColorScheme, View } from "react-native";
import HouseFill from "@/components/svgs/HouseFill";
import House from "@/components/svgs/House";
import { styles } from "./layout.style";
import { Colors } from "@/styles/variables";
import Person from "@/components/svgs/Person";
import PersonFill from "@/components/svgs/PersonFill";
import Create from "@/components/svgs/Create";
import CreateFill from "@/components/svgs/CreateFill";
import Search from "@/components/svgs/Search";
import Chat from "@/components/svgs/Chat";
import ChatFill from "@/components/svgs/ChatFill";
import SearchFill from "@/components/svgs/SearchFill";

const Tab = createBottomTabNavigator();

function TabBarIcon({ icon }: { name: string; icon: typeof House }) {
    const Icon = icon;
    const theme = useColorScheme() ?? "light";
    const isDark = theme === "dark";

    return (
        <View style={styles.tabBarIcon}>
            <View>
                <Icon width={24} color={isDark ? "white" : "black"}/>
            </View>
        </View>
    )
}

export default function TabsLayout() {
    const theme = useColorScheme() ?? "light";
    const isDark = theme === "dark";

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
                borderTopWidth: 0,
                paddingTop: 10,
            }
        }}>
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{
                    tabBarIcon: ({ focused }) => {
                        if(focused) {
                            return <TabBarIcon name="Home" icon={HouseFill} />
                        }
                        return <TabBarIcon name="Home" icon={House} />
                    }
                }}
            />
            <Tab.Screen 
                name="Search" 
                component={Profile} 
                options={{
                    tabBarIcon: ({ focused }) => {
                        if(focused) {
                            return <TabBarIcon name="Search" icon={SearchFill} />
                        }
                        return <TabBarIcon name="Search" icon={Search} />
                    }
                }}
            />
            <Tab.Screen 
                name="Create" 
                component={Profile} 
                options={{
                    tabBarIcon: ({ focused }) => {
                        if(focused) {
                            return <TabBarIcon name="Create" icon={CreateFill} />
                        }
                        return <TabBarIcon name="Create" icon={Create} />
                    }
                }}
            />
            <Tab.Screen 
                name="Chat" 
                component={Profile} 
                options={{
                    tabBarIcon: ({ focused }) => {
                        if(focused) {
                            return <TabBarIcon name="Chat" icon={ChatFill} />
                        }
                        return <TabBarIcon name="Chat" icon={Chat} />
                    }
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={Profile} 
                options={{
                    tabBarIcon: ({ focused }) => {
                        if(focused) {
                            return <TabBarIcon name="Profile" icon={PersonFill} />
                        }
                        return <TabBarIcon name="Profile" icon={Person} />
                    }
                }}
            />
        </Tab.Navigator>
    )
}