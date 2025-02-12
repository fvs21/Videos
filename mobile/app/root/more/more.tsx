//page for more options (like a help page)

import GoBackButton from "@/components/GoBackButton";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./more.style";
import { ThemedText } from "@/components/ThemedText";
import Logout from "@/components/svgs/Logout";
import { useColorScheme } from "react-native";

export default function More() {
    const theme = useColorScheme() ?? "light";
    const isDark = theme === "dark";

    return (
        <ThemedSafeAreaView>
            <View style={styles.moreContainer}>
                <TouchableOpacity style={[styles.moreOption]}>
                    <View style={styles.option}>
                        <View style={[styles.optionIcon, isDark ? styles.optionIconDark : styles.optionIconLight]}>
                            <Logout width={20} color="black" />
                        </View>
                        <ThemedText weight='300' type='default' style={{fontSize: 18}}>Log Out</ThemedText>
                    </View>
                </TouchableOpacity>
            </View>
        </ThemedSafeAreaView>
    )
}