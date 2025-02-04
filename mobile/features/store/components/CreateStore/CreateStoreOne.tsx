import GoBackButton from "@/components/GoBackButton";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./CreateStore.style";
import { ThemedText } from "@/components/ThemedText";
import ThemedTextInput from "@/components/ThemedTextInput";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useCreateStoreName } from "../../store";

export default function CreateStoreOne() {
    const [name, setName] = useCreateStoreName();

    const navigation = useNavigation<any>();

    return (
        <ThemedSafeAreaView>  
            <View style={styles.header}>
                <GoBackButton />
                <View style={styles.title}>
                    <ThemedText type="title" weight="300">
                        Choose a name for your store
                    </ThemedText>
                    <ThemedText type="subtitle" weight="300">
                        (optional)
                    </ThemedText>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.storeOptionInputContainer}>
                    <ThemedTextInput style={styles.storeOptionInput} value={name} setValue={setName} placeholder="Store name"/>
                </View>
                <View style={styles.nextButtonContainer}>
                    <TouchableOpacity style={styles.nextButton} onPress={() => navigation.push("SetupStore", {step: '1'})}>
                        <Text style={{color: "white", fontSize: 16}}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ThemedSafeAreaView>
    )
}