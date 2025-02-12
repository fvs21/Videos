import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { styles } from "./create.style";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import GoBackButton from "@/components/GoBackButton";
import { Colors } from "@/styles/variables";
import Person from "@/components/svgs/Person";
import Shop from "@/components/svgs/Shop";
import { useNavigation } from "@react-navigation/native";

export default function CreateStore() {
    const theme = useColorScheme() ?? "light";
    const isDark = theme === "dark";
    const borderColor = isDark ? Colors.dark.border : Colors.light.border;
    const svgColor = isDark ? "white" : "black";
    const navigation = useNavigation<any>();

    return (
        <ThemedSafeAreaView>
            <View style={styles.createStoreContainer}>
                <View style={styles.createStoreHeader}>
                    <GoBackButton />
                    <ThemedText weight="300" type="title" style={{marginTop: 20}}>
                        Start selling
                    </ThemedText>
                </View>
                <View style={styles.createStoreOptionsContainer}>
                    <TouchableOpacity style={[styles.createStoreOption, {borderColor: borderColor}]} onPress={() => navigation.navigate("SetupStore", {step: '0'})}>
                        <View style={styles.storeOptionHeader}>
                            <ThemedText weight="300" type="defaultSemiBold">
                                Individual seller
                            </ThemedText>
                            <Person width={20} color={svgColor} />
                        </View>
                        <View style={styles.storeOptionDescription}>
                            <ThemedText weight="300" type="default">
                                Sell your own products
                            </ThemedText>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.createStoreOption, {borderColor: borderColor}]}>
                        <View style={styles.storeOptionHeader}>
                            <ThemedText weight="300" type="defaultSemiBold">
                                For businesses
                            </ThemedText>
                            <Shop width={20} color={svgColor} />
                        </View>
                        <View style={styles.storeOptionDescription}>
                            <ThemedText weight="300" type="default">
                                Are you a business trying to promote your products?
                            </ThemedText> 
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ThemedSafeAreaView>
    )
}